module.exports = {
    getDDMMYYY: (dateString) => {
        let d = dateString.getDate();
        let m = dateString.getMonth() + 1;
        let y = dateString.getFullYear();
        return d + '-' + m + '-' + y;
      },
      getYYYmmDD: (dateString) => {
        let d = dateString.getDate();
        if (d < 10) d = '0' + d; 
        let m = dateString.getMonth() + 1;
        if (m < 10) m = '0' + m;
        let y = dateString.getFullYear();
        return y + '-' + m + '-' + d;
      },
      getTime: (dateString) => {
        let d = dateString.getDate();
        if (d < 10) d = '0' + d; 
        let m = dateString.getMonth() + 1;
        let hour = dateString.getHours();
        let min = dateString.getMinutes();
        return hour + ':' + min + '-' + d + '/' + m;
      },
      sumIndex: (index) => index + 1, 
      getIcon: (column, sort) => {
        const sortType = column === sort.column ? sort.type : 'default';
        const icons = {
          default: 'fa-solid fa-sort',
          desc: 'fa-solid fa-arrow-down-z-a',
          asc: 'fa-solid fa-arrow-down-a-z',
        }
        return icons[sortType];
      },
      getType: (column, sort) => {
        const sortType = column === sort.column ? sort.type : 'default';
          const types = {
            default: 'desc',
            desc: 'asc',
            asc: 'desc',
          }
          return types[sortType];
      },
}