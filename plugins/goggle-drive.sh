#!/bin/bash

# Array of Google Drive File IDs of the zip files
FILE_IDS=("1bSszBB38pddvkv6DknzIvwTQlL-YyUQY" "1_lNCKB5VK_RsLvHgI0RycH9BSNYGNTM4")

# Array of URLs to download the zip files
URLS=("https://drive.google.com/uc?export=download&id=${FILE_IDS[0]}" "https://drive.google.com/uc?export=download&id=${FILE_IDS[1]}")

# Array of local file names to save the downloaded zip files
ZIP_FILES=("file1.zip" "file2.zip")

# Array of destination directories where you want to extract the contents
DEST_DIRS=("../plugins" "../plugins")

# Loop through each zip file
for ((i=0; i<${#FILE_IDS[@]}; i++)); do
    FILE_ID="${FILE_IDS[$i]}"
    URL="${URLS[$i]}"
    ZIP_FILE="${ZIP_FILES[$i]}"
    DEST_DIR="${DEST_DIRS[$i]}"
    
    # Download the zip file from Google Drive
    curl -L -o "$ZIP_FILE" "$URL"

    # Extract the contents of the zip file, overwriting existing files
    unzip -o -q "$ZIP_FILE" -d "$DEST_DIR"

    # Optionally, remove the downloaded zip file
    rm "$ZIP_FILE"
done
