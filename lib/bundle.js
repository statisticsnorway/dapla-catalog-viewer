'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useAxios = require('axios-hooks');
var semanticUiReact = require('semantic-ui-react');
var daplaJsUtilities = require('@statisticsnorway/dapla-js-utilities');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var useAxios__default = /*#__PURE__*/_interopDefaultLegacy(useAxios);

const TEST_IDS = {
  DEFAULT_SETTINGS_VALUES_BUTTON: 'setDefaultSettingsValues',
  PSEUDO_CONFIG_ICON: 'pseudoConfigIcon'
};

const UI = {
  DATA_LAST_FETCHED: {
    en: 'Data last fetched',
    nb: 'Data sist hentet'
  },
  FILTER_TABLE: {
    en: 'Filter table',
    nb: 'Filtrere tabellen'
  },
  HEADER: {
    en: 'Catalog Viewer',
    nb: 'Katalogvisning'
  },
  PATH: {
    en: 'Path',
    nb: 'Sti'
  },
  PSEUDO_CONFIG: {
    en: 'Pseudo config',
    nb: 'Pseudo config'
  },
  REFRESH_TABLE: {
    en: 'Fetch data again',
    nb: 'Hent data på nytt'
  },
  STATE: {
    en: 'State',
    nb: 'Tilstand'
  },
  TIMESTAMP: {
    en: 'Timestamp',
    nb: 'Dato'
  },
  TYPE: {
    en: 'Type',
    nb: 'Type'
  },
  VALUATION: {
    en: 'Valuation',
    nb: 'Verdivurdering'
  }
};

function CatalogFilter({
  error,
  loading,
  filterBy,
  language,
  setFilterBy,
  refetch,
  fetchTime
}) {
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid, {
    columns: "equal"
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Input, {
    fluid: true,
    size: "large",
    icon: "search",
    value: filterBy,
    disabled: loading || !!error,
    placeholder: UI.FILTER_TABLE[language],
    onChange: (event, {
      value
    }) => setFilterBy(value)
  })), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, null), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Grid.Column, {
    textAlign: "right",
    verticalAlign: "middle"
  }, /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.InfoPopup, {
    position: "left center",
    text: UI.REFRESH_TABLE[language],
    trigger: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
      link: true,
      name: "sync",
      size: "large",
      onClick: refetch,
      loading: loading,
      disabled: loading,
      style: {
        color: daplaJsUtilities.SSB_COLORS.BLUE
      }
    })
  }), `${UI.DATA_LAST_FETCHED[language]}: ${loading ? '-' : fetchTime}`));
}

function CatalogLabels({
  commonPrefixes,
  length,
  setFilterBy
}) {
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, commonPrefixes.map(commonPrefix => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
    as: "a",
    size: "large",
    key: commonPrefix[0],
    onClick: () => setFilterBy(`/${commonPrefix[0]}/`),
    style: {
      backgroundColor: daplaJsUtilities.SSB_COLORS.BLUE,
      marginRight: '1rem'
    }
  }, `/${commonPrefix[0]}`, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label.Detail, null, `(${commonPrefix[1]})`))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label, {
    as: "a",
    size: "large",
    onClick: () => setFilterBy(''),
    style: {
      backgroundColor: daplaJsUtilities.SSB_COLORS.BLUE
    }
  }, `/`, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Label.Detail, null, `(${length})`)));
}

function PseudoConfigView({
  catalog,
  pseudoConfig,
  language
}) {
  const [modalOpen, setModalOpen] = React.useState(false);

  if (typeof pseudoConfig === 'object' && pseudoConfig !== null) {
    if (Object.keys(pseudoConfig).length !== 0) {
      return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Modal, {
        closeIcon: true,
        size: "large",
        open: modalOpen,
        style: daplaJsUtilities.SSB_STYLE,
        onClose: () => setModalOpen(false),
        trigger: /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
          link: true,
          name: "key",
          "data-testid": TEST_IDS.PSEUDO_CONFIG_ICON,
          style: {
            color: daplaJsUtilities.SSB_COLORS.YELLOW
          },
          onClick: () => setModalOpen(true)
        })
      }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Header, {
        size: "large",
        style: daplaJsUtilities.SSB_STYLE
      }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Icon, {
        name: "key",
        style: {
          color: daplaJsUtilities.SSB_COLORS.YELLOW
        }
      }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Header.Content, null, UI.PSEUDO_CONFIG[language], /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Header.Subheader, null, catalog))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Modal.Content, {
        style: daplaJsUtilities.SSB_STYLE
      }, /*#__PURE__*/React__default['default'].createElement("pre", null, JSON.stringify(pseudoConfig, null, 2))));
    } else {
      return null;
    }
  } else {
    return null;
  }
}

const findCommonPrefixes = catalogs => {
  const prefixes = catalogs.map(catalog => catalog.id.path.split('/').filter(element => element !== '').slice(0, 1));
  const mergedPrefixes = [].concat.apply([], prefixes);
  const countedPrefixes = mergedPrefixes.reduce((acc, e) => {
    if (e in acc) {
      acc[e]++;
    } else {
      acc[e] = 1;
    }

    return acc;
  }, {});
  return Object.entries(countedPrefixes).sort((a, b) => b[1] - a[1]).filter(value => value[1] >= 3);
};
const sortArrayBy = (array, by, type) => {
  switch (type) {
    case 'string':
      return array.sort((a, b) => {
        if (a.hasOwnProperty(by) && b.hasOwnProperty(by)) {
          return a[by].localeCompare(b[by]);
        } else if (a.hasOwnProperty(by)) {
          return a[by].localeCompare('');
        } else if (b.hasOwnProperty(by)) {
          return ''.localeCompare(b[by]);
        } else {
          return 0;
        }
      });

    case 'timestamp':
      return array.sort((a, b) => {
        if (a.id.hasOwnProperty(by) && b.id.hasOwnProperty(by)) {
          return new Date(b.id[by] - 1000) - new Date(a.id[by] - 1000);
        } else {
          return 0;
        }
      });

    case 'nestedString':
      return array.sort((a, b) => {
        if (a.id.hasOwnProperty(by) && b.id.hasOwnProperty(by)) {
          return a.id[by].localeCompare(b.id[by]);
        } else {
          return 0;
        }
      });

    default:
      return array;
  }
};

const convertDateToView = (value, seconds = false) => {
  if (value !== undefined) {
    const date = new Date(value - 1000);
    const options = {
      hour: '2-digit',
      minute: '2-digit'
    };

    if (seconds) {
      options.second = '2-digit';
    }

    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString([], options)}`;
  } else {
    return value;
  }
};

const API = {
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
};

const VALUATION_COLORS = {
  OPEN: daplaJsUtilities.SSB_COLORS.BLUE,
  INTERNAL: daplaJsUtilities.SSB_COLORS.GREEN,
  SHIELDED: daplaJsUtilities.SSB_COLORS.YELLOW,
  SENSITIVE: daplaJsUtilities.SSB_COLORS.RED
};

function CatalogTable({
  catalogs,
  handleSort,
  language,
  sortedBy,
  sortDirection
}) {
  return /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table, {
    celled: true,
    selectable: true,
    sortable: true,
    basic: "very",
    compact: "very",
    size: "large"
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Header, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, null, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, {
    onClick: () => handleSort(API.CATALOG_OBJECT.OBJECT.STRING[0], 'nestedString'),
    sorted: sortedBy === API.CATALOG_OBJECT.OBJECT.STRING[0] ? sortDirection : null
  }, UI.PATH[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, {
    onClick: () => handleSort(API.CATALOG_OBJECT.OBJECT.STRING[1], 'timestamp'),
    sorted: sortedBy === API.CATALOG_OBJECT.OBJECT.STRING[1] ? sortDirection : null
  }, UI.TIMESTAMP[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, {
    onClick: () => handleSort(API.CATALOG_OBJECT.ENUM[2], 'string'),
    sorted: sortedBy === API.CATALOG_OBJECT.ENUM[2] ? sortDirection : null
  }, UI.TYPE[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, {
    onClick: () => handleSort(API.CATALOG_OBJECT.ENUM[0], 'string'),
    sorted: sortedBy === API.CATALOG_OBJECT.ENUM[0] ? sortDirection : null
  }, UI.VALUATION[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, {
    onClick: () => handleSort(API.CATALOG_OBJECT.ENUM[1], 'string'),
    sorted: sortedBy === API.CATALOG_OBJECT.ENUM[1] ? sortDirection : null
  }, UI.STATE[language]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.HeaderCell, null, UI.PSEUDO_CONFIG[language]))), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Body, null, catalogs.map(({
    id,
    pseudoConfig,
    state,
    type,
    valuation
  }, index) => /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Row, {
    key: index
  }, /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, {
    style: {
      fontWeight: 'bold'
    }
  }, id[API.CATALOG_OBJECT.OBJECT.STRING[0]].length > 100 ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Popup, {
    basic: true,
    flowing: true,
    trigger: /*#__PURE__*/React__default['default'].createElement("div", null, daplaJsUtilities.truncateString(id[API.CATALOG_OBJECT.OBJECT.STRING[0]], 100))
  }, id[API.CATALOG_OBJECT.OBJECT.STRING[0]]) : id[API.CATALOG_OBJECT.OBJECT.STRING[0]]), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, convertDateToView(id[API.CATALOG_OBJECT.OBJECT.STRING[1]])), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, type), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, {
    style: {
      color: VALUATION_COLORS[valuation]
    }
  }, valuation), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, null, state), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Table.Cell, {
    textAlign: "center"
  }, /*#__PURE__*/React__default['default'].createElement(PseudoConfigView, {
    language: language,
    pseudoConfig: pseudoConfig,
    catalog: id[API.CATALOG_OBJECT.OBJECT.STRING[0]]
  }))))));
}

function AppHome({
  restApi,
  language
}) {
  const [filterBy, setFilterBy] = React.useState('');
  const [catalogs, setCatalogs] = React.useState([]);
  const [fetchTime, setFetchTime] = React.useState('');
  const [commonPrefixes, setCommonPrefixes] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState('ascending');
  const [sortedBy, setSortedBy] = React.useState(API.CATALOG_OBJECT.OBJECT.STRING[0]);
  const [{
    data,
    loading,
    error
  }, refetch] = useAxios__default['default'](`${restApi}${API.GET_CATALOGS}`);

  const handleSort = (sortBy, type) => {
    const newSortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';

    if (sortBy === sortedBy) {
      setSortDirection(newSortDirection);
      setCatalogs(catalogs.reverse());
    } else {
      setSortedBy(sortBy);
      setCatalogs(sortArrayBy(catalogs, sortBy, type));
    }
  };

  React.useEffect(() => {
    if (!loading && !error && data !== undefined) {
      if (Array.isArray(data[API.CATALOGS])) {
        try {
          setFetchTime(convertDateToView(Date.now(), true));
          setCommonPrefixes(findCommonPrefixes(data[API.CATALOGS]));
          setCatalogs(sortArrayBy(data[API.CATALOGS], API.CATALOG_OBJECT.OBJECT.STRING[0], 'nestedString'));
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log('Received catalogs is not of Array format, received was:');
        console.log(data);
      }
    }
  }, [data, error, loading]);
  React.useEffect(() => {
    const handleFilter = string => {
      try {
        setSortedBy('');
        setSortDirection('ascending');
        setCatalogs(data[API.CATALOGS].filter(({
          id
        }) => id[API.CATALOG_OBJECT.OBJECT.STRING[0]].includes(string)));
      } catch (e) {
        console.log(e);
      }
    };

    if (data !== undefined && Array.isArray(data[API.CATALOGS])) {
      handleFilter(filterBy);
    }
  }, [data, filterBy]);
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(CatalogFilter, {
    error: error,
    loading: loading,
    refetch: refetch,
    filterBy: filterBy,
    language: language,
    fetchTime: fetchTime,
    setFilterBy: setFilterBy
  }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
    hidden: true
  }), loading ? /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Loader, {
    active: true,
    inline: "centered"
  }) : error ? /*#__PURE__*/React__default['default'].createElement(daplaJsUtilities.ErrorMessage, {
    error: error,
    language: language
  }) : /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(CatalogLabels, {
    commonPrefixes: commonPrefixes,
    length: data[API.CATALOGS].length,
    setFilterBy: setFilterBy
  }), /*#__PURE__*/React__default['default'].createElement(semanticUiReact.Divider, {
    hidden: true
  }), /*#__PURE__*/React__default['default'].createElement(CatalogTable, {
    language: language,
    sortedBy: sortedBy,
    catalogs: catalogs,
    handleSort: handleSort,
    sortDirection: sortDirection
  })));
}

exports.CatalogViewer = AppHome;
