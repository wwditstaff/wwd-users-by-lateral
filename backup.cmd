set src=c:\local\projects\node\ublat
set dst=%OneDrive%\projects\ublat
robocopy "%src%" "%dst%"  /XD %src%\node_modules /S /V /IS
