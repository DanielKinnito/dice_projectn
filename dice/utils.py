import os
import requests
import secrets

# Global pool to hold true random numbers
RANDOM_POOL = []
D6_API_KEY = os.getenv("D6_API_KEY")

def fetch_random_pool():
    """
    Fetch a batch of 1000 random numbers from random.org.
    Adjust the URL and parameters as needed.
    """
    url = "https://www.random.org/integers/"
    params = {
        "num": 1000,
        "min": 0,
        "max": 4294967295,  # 2^32 - 1
        "col": 1,
        "base": 10,
        "format": "plain",
        "rnd": "new",
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        # Convert the response text into a list of integers
        numbers = [int(num) for num in response.text.strip().split()]
        return numbers
    else:
        raise Exception(f"Failed to fetch random pool: {response.text}")

def initialize_random_pool():
    """
    Initialize the global pool if it is empty.
    """
    global RANDOM_POOL
    if not RANDOM_POOL:
        RANDOM_POOL = fetch_random_pool()

def get_noise_value():
    """
    Pop a noise value from the global random pool.
    If the pool is empty, reinitialize it.
    """
    global RANDOM_POOL
    if not RANDOM_POOL:
        initialize_random_pool()
    return RANDOM_POOL.pop(0)

def roll_dice():
    """
    Generate a dice roll using a combination of CSPRNG and random.org noise.
    """
    # Get a secure pseudo random number (32-bit integer)
    prng_value = secrets.randbits(32)
    # Get a true random number from our pool as noise
    noise = get_noise_value()
    # Combine the two numbers (here we use XOR)
    mixed = prng_value ^ noise
    # Map the result to a dice face (1 through 6)
    dice_face = (mixed % 6) + 1
    return dice_face

def reseed_if_needed(threshold=100):
    """
    If the random pool falls below a threshold, fetch additional numbers.
    """
    global RANDOM_POOL
    if len(RANDOM_POOL) < threshold:
        additional = fetch_random_pool()
        RANDOM_POOL.extend(additional)
