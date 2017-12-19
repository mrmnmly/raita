const app = {
  getCurrentYear() {
    const date = new Date();
    return date.getFullYear();
  },

  setCurrentYearInFooter() {
    const currentYear = this.getCurrentYear();
    const yearDomWrapper = document.getElementById('fotter__year');
    if (yearDomWrapper) {
      yearDomWrapper.textContent = currentYear;
    }
  },

  setYearsOfExperience () {
    const startingYear = 2011;
    const currentYear = this.getCurrentYear();
    const yearsOfExperience = currentYear - startingYear;
    const yearsOfExperienceDomWrapper = document.getElementById('experience__years-counter');
    if (yearsOfExperienceDomWrapper) {
      yearsOfExperienceDomWrapper.textContent = yearsOfExperience;
    }
  },

  init() {
    this.setCurrentYearInFooter();
    this.setYearsOfExperience();
  },
};

app.init();