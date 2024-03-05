#!/bin/bash
echo "start user script file"
# Define variables
module_dir="../plugins/onboarding/users" 
destination_dir="../src/users"
package_json="../../package.json"
app_module="../../src/app.module.ts"

# Copy module directory to destination using rsync
echo "Copying module directory to destination..."
rsync -av "${module_dir}/" "${destination_dir}/"

# Install dependencies if they are missing
echo "Installing dependencies..."
cd "${destination_dir}" || exit

# Check if dependencies are already installed
dependencies_installed=true

for dependency in "@nestjs/passport" "@nestjs/common" "passport-http" "passport-local" "passport-facebook" "passport-google-oauth20" "@nestjs/config" "@nestjs/jwt"; do
    if ! grep -q "\"${dependency}\"" "${package_json}"; then
        dependencies_installed=false
        echo  "Dependencies not found in package.json"
        break
    fi
done

# If dependencies are not installed, install them
if [ "$dependencies_installed" = false ]; then
    npm install --only=prod "@nestjs/passport" "@nestjs/common" "passport-http" "passport-local" "passport-facebook" "passport-google-oauth20" "@nestjs/config" "@nestjs/jwt"
    echo "Dependencies installed successfully."
else
    echo "All dependencies are already installed."
fi

# Add import statements at the top of AppModule
echo "Updating AppModule..."

# providers_to_add=(
#     "UsersModule"
# )

# # Check if providers already exist in AppModule
# if grep -q "imports:" "${app_module}"; then
#     for provider in "${providers_to_add[@]}"; do
#         # Check if the provider already exists in AppModule
#         if ! grep -q "${provider}" "${app_module}"; then
#             # Update AppModule to add the provider within square brackets
#             sed -i "/imports: \[/a\ \ \ \ ${provider}," "${app_module}"
#             echo "import ${provider} added to AppModule."
#         else
#             echo "import ${provider} already present in AppModule."
#         fi
#     done
# else
#     echo "Error: imports array not found in AppModule."
# fi

module_to_add=(
    "UsersModule"
)

# Check if imports array already exists in AppModule
if grep -q "imports:" "${app_module}"; then
    # Add UsersModule to imports array within square brackets
    sed -i "/imports: \[/ s/\]/,${module_to_add}\]/" "${app_module}"
    echo "Module ${module_to_add} added to imports array in AppModule."
else
    echo "Error: imports array not found in AppModule."
fi


# Print success message
echo "Module copied to destination and AppModule updated."