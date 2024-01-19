# qbench-plugins
Plugins for modifying qbench for internal use.


# Navbar Customization
**Current Version: v2.0**

**Uploaded 1/19/2024 3:03 AM UTC**

Changes the styling of the navbar in different QBench sites and serves as an alert to show which site is active.

To use this plugin as-is - 
1) Download the .xpi file in the navbarCustomization folder
2) Drag and drop into a firefox window
3) Accept any permissions necessary to install the plugin
4) Navigate to about:addons in your browser and select the "..." button next to the QBench Navbar Extension
5) Open the Extension Options. This will take you to another page where you can add customizations via a UI.

To use a modified version of the plugin -
1) Change the source code and revise as needed. Please create a separate branch and submit a PR.
2) Create a developer account at https://addons.mozilla.org/en-US/developers/
3) Submit a new add-on
4) Download the manifest.json and any js files needed to run the script
5) Ensure that the manifest.json includes all files that need to be executed
6) Zip the manifest.json and js files with at least the manifest.json at the root directory
7) Rename the zip file extension to '.xpi'. Note: Only Deflate compression is accepted. For larger files, Windows zip functionality may use a different compression.
8) Upload the .xpi file along with the source code as .zip to the add-on submission form
9) Wait until the extension is signed and approved (this usually only takes a few minutes)
10) Go to "My Add-Ons" -> "Your Add-On" -> "Manage Status and Versions" and click the download link at the top of the view to install.
11) Save the downloaded .xpi file and submit to your fork to share the active version with the PR.
