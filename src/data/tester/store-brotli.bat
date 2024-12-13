@echo off
setlocal enabledelayedexpansion

rem Specify the folder containing the JSON files
set "source_folder=C:\Users\Felipe\Desktop\learning\scenathon-backend\src\data\tester"

rem Specify the target folder where Brotli compressed files will be placed
set "target_folder=C:\Users\Felipe\Desktop\learning\scenathon-backend\src\data\tester\tester-brotli"

rem Create the target folder if it does not exist
if not exist "%target_folder%" (
    mkdir "%target_folder%"
)

rem Change directory to the source folder
cd /d "%source_folder%"

rem Loop through all .json files in the folder
for %%f in (*.json) do (
    rem Brotli compress each .json file individually
    brotli -Z "%%f" -o "%%~nf.json.br"

    rem Move the Brotli compressed file to the target folder
    move "%%~nf.json.br" "%target_folder%"
)

endlocal
echo Done!
