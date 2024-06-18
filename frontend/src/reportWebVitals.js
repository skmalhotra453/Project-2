// const reportWebVitals = onPerfEntry => {
//   if (onPerfEntry && onPerfEntry instanceof Function) {
//     import('web-vitals')
//       .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
//         getCLS(onPerfEntry);
//         getFID(onPerfEntry);
//         getFCP(onPerfEntry);
//         getLCP(onPerfEntry);
//         getTTFB(onPerfEntry);
//       })
//       .catch(err => console.error('Failed to load web-vitals', err));
//   }
// };

// export default reportWebVitals;



// import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// const reportWebVitals = (onPerfEntry) => {
//   if (onPerfEntry && onPerfEntry instanceof Function) {
//     getCLS(onPerfEntry);
//     getFID(onPerfEntry);
//     getFCP(onPerfEntry);
//     getLCP(onPerfEntry);
//     getTTFB(onPerfEntry);
//   }
// };

// export default reportWebVitals;

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals')
      .then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
        onCLS(onPerfEntry);
        onFID(onPerfEntry);
        onFCP(onPerfEntry);
        onLCP(onPerfEntry);
        onTTFB(onPerfEntry);
      })
      .catch(err => console.error('Failed to load web-vitals', err));
  }
};

export default reportWebVitals;
