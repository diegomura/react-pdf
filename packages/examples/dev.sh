#!/bin/bash

# Get the directory of the script
scriptDir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Get the list of directories adjacent to the script
dirs=()
for dir in "$scriptDir"/*/ ; do
    [ -d "$dir" ] && dirs+=("$(basename "$dir")")
done

# Check if any directories were found
if [ ${#dirs[@]} -eq 0 ]; then
    echo "No example directories found."
    exit 1
fi

if [ -n "$1" ]; then
    # First argument provided
    selectedDir="$1"
    if [[ " ${dirs[@]} " =~ " $selectedDir " ]]; then
        echo "Selected example: $selectedDir"
    else
        echo "Example '$selectedDir' does not exist adjacent to the script."
        exit 1
    fi
else
    # No argument provided, prompt the user to select one
    echo "Please select an example:"
    select selectedDir in "${dirs[@]}"; do
        if [ -n "$selectedDir" ]; then
            echo "You selected: $selectedDir"
            break
        else
            echo "Invalid selection."
        fi
    done
fi

# Run 'yarn dev' inside the selected directory
cd "$scriptDir/$selectedDir" || { echo "Failed to change directory to $scriptDir/$selectedDir"; exit 1; }

echo "Running 'yarn dev' in $scriptDir/$selectedDir"
yarn dev
