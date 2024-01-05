
import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fa-solid fa-gauge',  
    label: 'Dashboard'
  },
  {
    routeLink: 'history',
    icon: 'fa-regular fa-clock',  
    label: 'History'
  },
  {
    routeLink: 'internaldatabase',
    icon: 'fa-solid fa-database', 
    label: 'Internal Database'
  },
  {
    routeLink: 'call-detail',
    icon: 'fa-solid fa-mobile-screen-button',  
    label: 'Call Details'
  },
  {
    routeLink: 'managerole',
    icon: 'fa-regular fa-address-card',  
    label: 'Permissions',
    items:[
      {
        routeLink:'managerole',
        label:'User Management'
      },
      {
        routeLink:'managerole/create-areas',
        label:'Create Areas'
      },
      {
        routeLink:'managerole/create-permission',
        label:'Create Permissions'
      },
      {
        routeLink:'managerole/create-user-roles',
        label:'Create User Roles'
      },

    ]
  },
  {
    routeLink: 'candidate-status',
    icon: 'fa-regular fa-user',  
    label: 'Candidate Status'
  },
  {
    routeLink: 'jobs',
    icon: 'fa-solid fa-briefcase',  
    label: 'Jobs',
    items:[
      {
        routeLink:'myjob',
        label:'My Jobs'
      },
      {
        routeLink:'new-job',
        label:'New Jobs'
      },

    ]
  },
  {
    routeLink: 'report',
    icon: 'fa-solid fa-chart-pie',  
    label: 'Report', 
    items:[
      {
        routeLink:'call_detail_report',
        label:'Candidate Call Report'
      }
    ]
  },
  {
    routeLink: 'settings',
    icon: 'fa-solid fa-gear',  
    label: 'Settings',
    items:[
      {
        routeLink:'recent-activity',
        label:'Recent Activity'
      },
      {
        routeLink:'billing-detail',
        label:'Billing Detail'
      },
      {
        routeLink:'department',
        label:'Department'
      },
      {
        routeLink:'agency',
        label:'Agency'
      },
      {
        routeLink:'trackers',
        label:'Tracker Fields'
      },
      {
        routeLink:'new-trackers',
        label:'Add New Trackers'
      },
    ]
  },
  // {
  //   routeLink: 'logout',
  //   icon: 'fa-solid fa-arrow-right-from-bracket',  
  //   label: 'Logout'
  // },
];