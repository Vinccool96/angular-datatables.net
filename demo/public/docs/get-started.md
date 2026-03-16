<h5 id="angular-cli-recommended">Angular CLI<sup style="
    font-size: 14px;
    margin-left: 10px;
">(Recommended)</sup></h5>

```bash
ng add angular-datatables.net
```

> You can find latest releases on GitHub [here](https://github.com/vinccool96/angular-datatables.net/releases).

##### Manual Installation

1. Install the following packages:

```bash
npm install jquery --save
npm install datatables.net --save
npm install datatables.net-dt --save
npm install angular-datatables.net --save
npm install @types/jquery --save-dev
```

2. Add the dependencies in the scripts and styles attributes to `angular.json`:

```json
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "options": {
            "styles": ["node_modules/datatables.net-dt/css/dataTables.dataTables.min.css"],
            "scripts": ["node_modules/jquery/dist/jquery.js", "node_modules/datatables.net/js/dataTables.min.js"]
          }
        }
      }
    }
  }
}
```
