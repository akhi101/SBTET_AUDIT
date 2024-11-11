Sonar\\SonarScanner.MSBuild.exe begin /k:"SBTET_SS" /d:sonar.host.url="http://192.168.100.9:9000" /d:sonar.login="ab7e7f149c52a92ac2b2f723942aac955befe4c8"
"C:\\Program Files (x86)\\MSBuild\14.0\\Bin\\MSBuild.exe" SoftwareSuite.sln /t:Rebuild
Sonar\\SonarScanner.MSBuild.exe end /d:sonar.login="ab7e7f149c52a92ac2b2f723942aac955befe4c8"