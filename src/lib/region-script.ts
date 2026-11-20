export const REGION_KEY = "ng-region";

/**
 * Runs inline in <head> before first paint so region copy never flashes.
 * Order: #india / #global in the URL, then the saved choice, then Global.
 * <html class="global"> = Global $. No class = India ₹.
 */
export const REGION_SCRIPT = `try{var d=document.documentElement,h=(location.hash||"").toLowerCase(),r=h==="#india"?"in":h==="#global"?"gl":null;if(r){localStorage.setItem("${REGION_KEY}",r)}else{r=localStorage.getItem("${REGION_KEY}")}d.classList.toggle("global",r!=="in")}catch(e){document.documentElement.classList.add("global")}`;
