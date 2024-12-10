#!/bin/bash

# Specify the folder containing the JSON files
source_folder="./"

# Specify the target folder where Brotli compressed files will be placed
target_folder="./tester-brotli"

# Create the target folder if it does not exist
mkdir -p "$target_folder"

# Change directory to the source folder
cd "$source_folder" || exit

# Loop through all .json files in the folder
for f in *.json; do
    # Brotli compress each .json file individually
    brotli -Z "$f" -o "${f%.json}.json.br"
    
    # Move the Brotli compressed file to the target folder
    mv "${f%.json}.json.br" "$target_folder"
done

echo "Done!"
