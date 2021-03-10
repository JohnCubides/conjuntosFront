
/**
 * Archivo para configurar las rutas de navegacion de la aplicacion.
 * Se deja un ejemplo de como se debe configurar
 */
export class RoutingPath {
  public static appRouting = {
    pages: {
      no_autorizado: {
        path: 'no-autorizado',
        breadcrumb: 'No autorizado'
      },
      error_servicio: {
        path: 'service-error',
        breadcrumb: 'Service error'
      }
    },
    components: {
      account: {
        path: 'account',
        breadcrumb: 'Account',
        pages: {
          login: {
            path: 'login',
            breadcrumb: ''
          },
          resetPassword: {
            path: 'reset-password',
            breadcrumb: ''
          },
          restorePassword: {
            path: 'restore-password',
            breadcrumb: ''
          }
        }
      },
      dashboard: {
        path: 'dashboard',
        breadcrumb: 'INICIO',
        pages: {
          administrator_rol: {
            path: 'administrator-rol',
            breadcrumb: 'Administrar roles',
            permits: 'CONFIG_ADMINROLE',
            pages: {
              create: {
                path: 'create',
                breadcrumb: 'Crear',
                permits: 'CONFIG_ADMINROLE_CREATE'
              },
              modify: {
                path: 'modify/:id',
                breadcrumb: 'Modificar',
                permits: 'CONFIG_ADMINROLE_UPDATE'
              },
              consult: {
                path: 'consult/:id',
                breadcrumb: 'Consultar',
                permits: 'CONFIG_ADMINROLE_CONSULT'
              }
            }
          },
          administrator_user: {
            path: 'administrator-user',
            breadcrumb: 'Administrar usuarios',
            permits: 'CONFIG_ADMINUSER',
            pages: {
              create: {
                path: 'create',
                breadcrumb: 'Crear',
                permits: 'CONFIG_ADMINUSER_CREATE'
              },
              modify: {
                path: 'modify/:id',
                breadcrumb: 'Modificar',
                permits: 'CONFIG_ADMINUSER_UPDATE'
              },
              consult: {
                path: 'consult/:id',
                breadcrumb: 'Consultar',
                permits: 'CONFIG_ADMINUSER_CONSULT'
              }
            }
          },
          administrator_estate_units: {
            path: 'administrator-estate-units',
            breadcrumb: 'Unidades Inmobiliarias',
            permits: 'CONFIG_ADMINESTATEUNITS',
            pages: {
              create: {
                path: 'create',
                breadcrumb: 'Crear',
                permits: 'CONFIG_ADMINESTATEUNITS_CREATE'
              },
              modify: {
                path: 'modify/:id',
                breadcrumb: 'Modificar',
                permits: 'CONFIG_ADMINESTATEUNITS_UPDATE'
              },
              consult: {
                path: 'consult/:id',
                breadcrumb: 'Consultar',
                permits: 'CONFIG_ADMINESTATEUNITS_CONSULT'
              },
              administrator_groupings: {
                path: 'administrator-groupings/:id',
                breadcrumb: 'Agrupacion',
                permits: 'CONFIG_ADMINGROUP',
                pages: {
                  create: {
                    path: 'create/:id',
                    breadcrumb: 'Crear',
                    permits: 'CONFIG_ADMINGROUP_CREATE'
                  },
                  modify: {
                    path: 'modify/:id',
                    breadcrumb: 'Modificar',
                    permits: 'CONFIG_ADMINGROUP_UPDATE'
                  },
                  administrator_group_independent: {
                    path: 'administrator-group-independent/:id',
                    breadcrumb: 'Unidad inpedendiente',
                    permits: 'CONFIG_ADMININDEPENDENTUNIT',
                    pages: {
                      create: {
                        path: 'create',
                        breadcrumb: 'Crear',
                        permits: 'CONFIG_ADMININDEPENDENTUNIT_CREATE'
                      },
                      modify: {
                        path: 'modify/:id',
                        breadcrumb: 'Modificar',
                        permits: 'CONFIG_ADMININDEPENDENTUNIT_UPDATE'
                      },
                      admin_independet_user_units: {
                        path: 'admin-independet-user-units/:id',
                        breadcrumb: 'Personas asociadas',
                        permits: 'CONFIG_ADMINASSOCIATEDINDEPENDENTUNIT',
                        pages: {
                          consult: {
                            path: 'consult/:id',
                            breadcrumb: 'Consultar',
                            permits: 'CONFIG_ADMINASSOCIATEDINDEPENDENTUNIT_CONSULT'
                          },
                          create: {
                            path: 'create',
                            breadcrumb: 'Crear',
                            permits: 'CONFIG_ADMINASSOCIATEDINDEPENDENTUNIT_CREATE'
                          },
                          modify: {
                            path: 'modify/:id',
                            breadcrumb: '',
                            permits: 'CONFIG_ADMINASSOCIATEDINDEPENDENTUNIT_UPDATE'
                          },
                        }
                      },
                    }
                  },
                }
              },
            }
          },
        }
      },
      errors: {
        path: 'error',
        breadcrumb: 'error',
        pages: {
          notFound: {
            path: 'not-found',
            breadcrumb: 'not-found'
          },
          badRequest: {
            path: 'bad-request',
            breadcrumb: 'bad-request'
          },
          unauthorized: {
            path: 'unauthorized',
            breadcrumb: 'unauthorized'
          }
        }
      }
    }
  }
}
