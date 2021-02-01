import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [

  {
    path : 'auth',
    loadChildren :()=> import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'deals',
    loadChildren: () => import('./modules/generic-master/generic-master.module').then(m => m.GenericMasterModule),
    data: { layouts: ['deals'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'deals/:id',
    loadChildren: () => import('./modules/generic-detail/generic-detail.module').then(m => m.GenericDetailModule),
    data: {
      masterApiUrl: 'deals',
      lookupFields: ['noteRelateID', 'relateToID', 'dealCustomer', 'dealContact', 'deal'],
      layouts: ['fm-mk-06', 'fm-mk-13', 'fm-mk-11', 'so']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'fm-mk-06/:id',
    loadChildren: () => import('./modules/generic-detail/generic-detail.module').then(m => m.GenericDetailModule),
    data: {
      masterApiUrl: 'fm-mk-06',
      lookupFields: ['hdr'],
      layouts: ['fm-mk-06-dtl']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'fm-mk-06-dtl/:id',
    loadChildren: () => import('./modules/generic-detail/generic-detail.module').then(m => m.GenericDetailModule),
    data: {
      masterApiUrl: 'fm-mk-06-dtl',
      lookupFields: ['hdr'],
      layouts: ['bom','route', 'spec-result']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'fm-mk-13/:id',
    loadChildren: () => import('./modules/generic-detail/generic-detail.module').then(m => m.GenericDetailModule),
    data: {
      masterApiUrl: 'fm-mk-13',
      lookupFields: ['hdr'],
      layouts: ['fm-mk-13-dtl']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'fm-mk-11/:id',
    loadChildren: () => import('./modules/generic-detail/generic-detail.module').then(m => m.GenericDetailModule),
    data: {
      masterApiUrl: 'fm-mk-11',
      lookupFields: ['hdr'],
      layouts: ['fm-mk-11-dtl']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'so/:id',
    loadChildren: () => import('./modules/generic-detail/generic-detail.module').then(m => m.GenericDetailModule),
    data: {
      masterApiUrl: 'so',
      lookupFields: ['hdr'],
      layouts: ['so-dtl']
    },
    canActivate: [AuthGuard]
  },

  {
    path: 'contact',
    loadChildren: () => import('./modules/generic-master/generic-master.module').then(m => m.GenericMasterModule),
    data: { layouts: ['contact'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'contact/:id',
    loadChildren: () => import('./modules/generic-detail/generic-detail.module').then(m => m.GenericDetailModule),
    data: {
      masterApiUrl: 'contacts',
      lookupFields: ['noteRelateID', 'relateToID',  'dealContact','contactAddress','contactPhoneNo', 'contactLineId'],
      layouts: ['notes', 'activitiestask', 'activitiesevent', 'activitiescall', 'deals']
    },
    canActivate: [AuthGuard]
  },

  {
    path: 'customer',
    loadChildren: () => import('./modules/generic-master/generic-master.module').then(m => m.GenericMasterModule),
    data: { layouts: ['customer'] },
    canActivate: [AuthGuard]
  },

  {
    path: 'customer/:id',
    loadChildren: () => import('./modules/generic-detail/generic-detail.module').then(m => m.GenericDetailModule),
    data: {
      masterApiUrl: 'customers',
      lookupFields: ['noteRelateID', 'relateToID', 'dealCustomer'],
      layouts: ['notes', 'activitiestask', 'activitiesevent', 'activitiescall', 'deals']
    },
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'deals'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
