export default function format24h() {
    let message = '';
    const currentHours = new Date().getHours();
    if (currentHours >= 1 && currentHours <= 10){
         message = "Chào buổi sáng, em yêu !";
    } else if (currentHours > 10 && currentHours <= 12){
         message = "Chào buổi trưa, em yêu !";
    } else if (currentHours > 12 && currentHours <= 18){
         message = "Chào buổi chiều, em yêu !";
    } else {
         message = "Chào buổi tối, em yêu !";
    }

    return message;
}
