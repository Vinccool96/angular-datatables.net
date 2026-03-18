##### NPM

You need to install its dependencies:

```bash
# JS file
npm install datatables.net-colreorder --save
# CSS file
npm install datatables.net-colreorder-dt --save
```

##### angular.json

Add the dependencies in the scripts and styles attributes:

```json
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "options": {
            "styles": ["other styles", "node_modules/datatables.net-colreorder-dt/css/colReorder.dataTables.css"],
            "scripts": ["other scripts", "node_modules/datatables.net-colreorder/js/dataTables.colReorder.js"],
            "other": "options"
          }
        }
      }
    }
  }
}
```
