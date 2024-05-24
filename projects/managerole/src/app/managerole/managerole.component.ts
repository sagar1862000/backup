import { Component } from '@angular/core';
import { DbService } from '../../../../../src/app/services/db.service'

@Component({
  selector: 'app-managerole',
  templateUrl: './managerole.component.html',
  styleUrls: ['./managerole.component.scss']
})
export class ManageroleComponent {
  title = 'User Management'

  constructor(private db: DbService,) {
  }

  ngOnInit() {
    this.requiredPermission = [];
    this.getRoleId()
    this.getDefaultPermissionsView()

  }



  toggleSelectAll(id: number, area_name: string, checked: boolean): void {
    this.allPermissions.forEach(data => {
      if (data.id === id && data.area_name === area_name) {
        data.permissions.forEach(permission => {
          permission.isChecked = checked;
        });
      }
    });
  }




  isChecked;
  allPermissions;
  makePermissions() {
    // debugger;
    this.allPermissions = this.alldefaultpermissions.map(area => {
      area.permissions = area.permissions.map(permission => {
        // debugger;
        const isChecked = this.requiredPermission.some(item => item.permission_id === permission.id);
        return {
          ...permission,
          isChecked: isChecked
        };
      });
      // debugger;
      return area;
    });

    this.allPermissions = this.allPermissions.map((item) => {
      const allChecked =
        item.permissions &&
        Array.isArray(item.permissions) &&
        item.permissions.length > 0 &&
        item.permissions.every((permission) => permission.isChecked);

      return {
        area_name: item.area_name,
        isallChecked: allChecked || false,
        id: item.id,
        permissions: item.permissions
      };
    });
    console.log(this.allPermissions, 'allPermissions');
  }

  isAllSelected(data: any): void {
    if (data && data.permissions) {
      data.isallChecked = data.permissions.every((permission: any) => permission.isChecked);
    } else {
      data.isallChecked = false;
    }
  }

  dynamicData = 'permissions/update-permissions/'
  onSubmit() {
    console.log(this.allPermissions, 'submitdata')
    const arr9 = this.allPermissions
      .map(item => item.permissions)
      .flat()
      .filter(permission => permission.isChecked)
      .map(({ id: permission_id }) => ({ permission_id }));

    console.log(arr9, 'check the data');

    const outputObject = {
      permissions: arr9.map(item => item.permission_id)
    };


    outputObject['role_id'] = this.selectedRoleId
    const postData = outputObject
    console.log(postData, ':postData')
  debugger;
    this.db.store(this.dynamicData, postData, ((response): void => {
      console.log('API Response:', response);
      // location.reload();
      // Handle the API response here
      this.getRoleId()
    })
    );

  }


  roleIdData: any = ''
  selectRoleIdurl: any = 'permissions/create-user-role/'
  getRoleId() {
    // debugger;
    this.db.list(this.selectRoleIdurl, null, (response) => {
      this.roleIdData = response;
      console.log(this.roleIdData, 'roleIdData');
    });

  }

  requiredPermission: any
  selectedRoleId: number;
  onRoleSelectionChange(event: any) {
    this.selectedRoleId = event.value;
    // Make the API call using HttpClient
    let postroleData = {
      role_id: this.selectedRoleId
    }
    const dynamicRoleurl = 'permissions/role-permissions-permissions-view/'
  
    this.db.store(dynamicRoleurl, postroleData, ((response): void => {
      console.log('API Response:', response);
      this.requiredPermission = response
      this.makePermissions()
      // window.location.reload();
    }
    )
    );
    
  }

  alldefaultpermissions: any = [];
  getPermissionsViewurl = 'permissions/permissions-areas-view/'
  getDefaultPermissionsView() {
    debugger;
    this.db.list('permissions/permissions-areas-view/', null, (response) => {
      this.alldefaultpermissions = response;
      this.makePermissions()
    });
  }

}
