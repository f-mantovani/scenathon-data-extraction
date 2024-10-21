@echo off
setlocal enabledelayedexpansion

rem Specify the folder containing the JSON files
set "source_folder=C:\Users\Felipe\Desktop\learning\scenathon-backend"

rem Specify the target folder where gzipped files will be placed
set "target_folder=C:\Users\Felipe\Desktop\learning\scenathon-backend\src\data\store\gzipped\"

rem Create the target folder if it does not exist
if not exist "%target_folder%" (
    mkdir "%target_folder%"
)

rem Change directory to the source folder
cd /d "%\src\data\store%"

rem Loop through all .json files in the folder
for %%f in (*.json) do (
    rem Gzip each .json file individually
    7z a -tgzip "%%~nf.json.gz" "%%f"
    rem Move the gzipped file to the target folder
    move "%%~nf.json.gz" "%target_folder%"
)

endlocal
echo Done!
pause