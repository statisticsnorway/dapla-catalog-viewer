export const API = {
  CATALOGS: 'catalogs',
  CATALOG_OBJECT: {
    ENUM: ['valuation', 'state', 'type'],
    OBJECT: {
      NAME: 'id',
      STRING: ['path', 'timestamp']
    },
    STRING: ['parentUri']
  },
  GET_HEALTH: '/health/ready',
  GET_CATALOGS: '/catalog',
  GET_CATALOGS_BY_PREFIX: prefix => `${API.GET_CATALOGS}/${prefix}`
}
