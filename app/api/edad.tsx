export function calculateAge(birthDate: Date): number {
    const today = new Date(); // Current date
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth(); // Months are 0-based (0 = January)
    const birthDay = birthDate.getDate();
  
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
  
    // Calculate the difference in years
    let age = currentYear - birthYear;
  
    // Adjust if the birthday hasn't occurred yet this year
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }
  
    return age;
  }
  