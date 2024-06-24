// Retrieved Folders in json Format (Array of blocks)
const flds = pm.response.json();

// Authentication
const access_token = pm.collectionVariables.get('access_token');

// Org and Tool Info
const org_unit_id = pm.collectionVariables.get("Org_Unit_ID");
const tool_Id = pm.collectionVariables.get('ToolId');
    
//Iterating the json using foreach() and creating a greade item for each folder element
flds.forEach(function(f) {
  const payload = {
    url: 'https://your-brightspace-instance-url/d2l/api/le/1.67/' + org_unit_id + '/grades/',
    method: 'POST',
    header: {
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json'
    },
    body: {
      mode: 'raw',
      raw: JSON.stringify({
        MaxPoints: 100,
        CanExceedMaxPoints: false,
        IsBonus: false,
        ExcludeFromFinalGradeCalculation: false,
        GradeSchemeId: null,
        Name: f.Name,
        ShortName: f.Name,
        GradeType: 'Numeric',
        CategoryId: null,
        Description: {
          Text: 'This is the Grade for ' + f.Name,
          Html: '<p>This is the Grade for <strong>' + f.Name + '<strong></p>'
        },
        IsHidden: false,
        AssociatedTool: {
          ToolId: tool_Id,
          ToolItemId: f.Id
        }
      })
    }
  }
  pm.sendRequest(
    payload , function (err, res) {
    console.log(res);
  });
});