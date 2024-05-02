import os

# Get the current directory
current_dir = os.getcwd()

# Iterate over each file in the current directory
for filename in os.listdir(current_dir):
    if os.path.isfile(filename):  # Check if it's a file
        # Create a directory with the same name as the file
        directory_name = os.path.splitext(filename)[0]
        os.makedirs(directory_name, exist_ok=True)
        
        # Move the file into the directory
        new_filepath = os.path.join(directory_name, "index.html")
        os.rename(filename, new_filepath)
