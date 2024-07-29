const noResponsiveScreen = document.createElement('div');
noResponsiveScreen.setAttribute('id','noResponsiveScreen');
const noResponsiveScreenText = document.createElement('div');
noResponsiveScreenText.setAttribute("id","noResponsiveScreenText");
noResponsiveScreenText.innerHTML = "This page can only be viewed in Landscape mode";
noResponsiveScreen.appendChild(noResponsiveScreenText);
document.body.appendChild(noResponsiveScreen);