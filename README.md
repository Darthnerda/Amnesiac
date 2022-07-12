# AMNESIAC
Find ready-to-run files [here](https://gitea.joshable.com/darthnerda/Amnesiac/releases). If you wan to jam on the markup and see results instantly, rember the following commands:

`npm i` (do this once to get all the dependencies)
`npm run dev` (this starts a server at localhost:5000 that will automatically rebuild the code with the latest changes to the markup - it will run so long as you have this terminal window running. Sometimes you might make a change that causes errors - the terminal will spit out a message with a line number into the markup that might help you find where the problem is)
`npm run build` (this will minify the code, spitting out a neat little bundle in the dist/ folder that you can send people)

The markup is at src/jsx/Amnesiac.js

You can change the styling of all \<p\> tags with the p entry of dist/style.css, and override those for the passage \<p\> tags with the .passage entry.
