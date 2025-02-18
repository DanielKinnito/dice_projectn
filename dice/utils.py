import os
import secrets
import requests
import logging
from django.conf import settings  # Import settings

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Global pool to hold true random numbers
RANDOM_POOL = []
# D6_API_KEY = os.getenv("D6_API_KEY")  # No longer needed
RANDOM_ORG_URL = "https://www.random.org/integers/"  # Define the URL

def fetch_random_pool(num_integers=1000):
    """
    Fetch a batch of random numbers from random.org.
    """
    # global D6_API_KEY, RANDOM_ORG_URL  # No longer needed
    D6_API_KEY = settings.D6_API_KEY  # Access from settings
    if not D6_API_KEY:
        logging.error("D6_API_KEY is not set.  Using fallback PRNG.")
        return [secrets.randbits(32) for _ in range(num_integers)]  # Fallback to PRNG

    url = RANDOM_ORG_URL
    params = {
        "num": num_integers,
        "min": 0,
        "max": 4294967295,  # 2^32 - 1
        "col": 1,
        "base": 10,
        "format": "plain",
        "rnd": "new",
    }
    try:
        response = requests.get(url, params=params, timeout=10)  # Added timeout
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
        numbers = [int(num) for num in response.text.strip().split()]
        logging.info(f"Fetched {len(numbers)} random numbers from random.org")
        return numbers
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to fetch random pool from random.org: {e}. Using fallback PRNG.")
        return [secrets.randbits(32) for _ in range(num_integers)]  # Fallback to PRNG

def initialize_random_pool():
    """
    Initialize the global pool if it is empty.
    """
    global RANDOM_POOL
    if not RANDOM_POOL:
        RANDOM_POOL = fetch_random_pool()
        logging.info("Initialized random pool.")

def get_noise_value():
    """
    Pop a noise value from the global random pool.
    If the pool is empty, reinitialize it.
    """
    global RANDOM_POOL
    if not RANDOM_POOL:
        initialize_random_pool()
    if not RANDOM_POOL:
        logging.warning("Random pool is empty after initialization. Using secrets.randbits as fallback.")
        return secrets.randbits(32)  # Fallback if initialization fails
    return RANDOM_POOL.pop(0)

def roll_dice():
    """
    Generate a dice roll using a combination of CSPRNG and random.org noise.
    """
    prng_value = secrets.randbits(32)
    noise = get_noise_value()
    mixed = prng_value ^ noise
    dice_face = (mixed % 6) + 1
    return dice_face

def reseed_if_needed(threshold=100):
    """
    If the random pool falls below a threshold, fetch additional numbers.
    """
    global RANDOM_POOL
    if len(RANDOM_POOL) < threshold:
        num_to_fetch = 1000  # Fetch the maximum allowed
        additional = fetch_random_pool(num_to_fetch)
        RANDOM_POOL.extend(additional)
        logging.info(f"Reseeding random pool.  Added {len(additional)} numbers.")
