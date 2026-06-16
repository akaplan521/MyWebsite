import subprocess
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

NETID = os.getenv("NETID")
SERVER = "w3.uvm.edu"
LOCAL = Path(__file__).parent.resolve() #file path of this script
REMOTE = f"{NETID}@{SERVER}:www-root/"


def deploy():

    try:
        print("uploading files\n")
        #running scp command subprocess
        subprocess.run([
            "scp", "-r",
            f"{LOCAL}/.",
            REMOTE
        ], check=True)
        #setting permissions 
        subprocess.run([
            "ssh", f"{NETID}@{SERVER}",
            "find www-root/ -type f -exec chmod 644 {} \\; && find www-root/ -type d -exec chmod 755 {} \\;"
        ], check=True)

        print("Done.")

    except subprocess.CalledProcessError as e:
        print(f"failed with exit code {e.returncode}: {e.cmd}")
    except FileNotFoundError as e:
        print(f"SCP or SSH not found on PATH: {e}")
    except Exception as e:
        print(f"unexpected error: {e}")

if __name__ == "__main__":
    deploy()