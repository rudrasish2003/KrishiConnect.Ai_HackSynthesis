import uuid
import platform
import subprocess

def get_mac_address():
    # Get the MAC address using uuid module
    mac = uuid.getnode()
    mac_address = ':'.join(['{:02x}'.format((mac >> ele) & 0xff)
                            for ele in range(40, -1, -8)])
    return mac_address


def get_serial_number():
    try:
        system_platform = platform.system()

        if system_platform == "Windows":
            # Windows command
            output = subprocess.check_output("wmic bios get serialnumber", shell=True)
            serial = output.decode().split("\n")[1].strip()
            return serial

        elif system_platform == "Linux":
            # Linux command
            output = subprocess.check_output("sudo dmidecode -s system-serial-number", shell=True)
            return output.decode().strip()

        elif system_platform == "Darwin":  # macOS
            # macOS command
            output = subprocess.check_output("system_profiler SPHardwareDataType | grep 'Serial Number'", shell=True)
            return output.decode().split(":")[1].strip()

        else:
            return "Unsupported OS"

    except Exception as e:
        return f"Error: {e}"


if __name__ == "main":
    print("MAC Address:", get_mac_address())
    print("Laptop Serial Number:", get_serial_number())