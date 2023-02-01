export default function countDate() {
    let message = '';
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(2022, 9, 10);
    
    const secondDateYear = new Date().getFullYear();
    const secondDateMonth = new Date().getMonth() + 1;
    const secondDateDay = new Date().getDate();
    
    const secondDate = new Date(secondDateYear, secondDateMonth, secondDateDay);
    
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    
    message = `Chúng ta đã yêu nhau được ${diffDays} ngày.`
    
    return message;
}
