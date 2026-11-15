/* ===================== Technické náhledy (UI) ===================== */
function typeIcon(t){
  var s='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="miter">';
  function leaf(x,y,w,h,side){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'"/>'
    +(side?'<path d="M'+(side==='L'?x+w:x)+' '+y+'L'+(side==='L'?x:x+w)+' '+(y+h/2)+'L'+(side==='L'?x+w:x)+' '+(y+h)+'" stroke-width=".9"/><path d="M'+x+' '+(y+h)+'L'+(x+w/2)+' '+y+'L'+(x+w)+' '+(y+h)+'" stroke-width=".9" stroke-dasharray="1.5 1.2"/>':'');}
  if(t==='1') s+='<rect x="5" y="2" width="14" height="20"/>'+leaf(7,4,10,16,'L');
  if(t==='2') s+='<rect x="2" y="3" width="20" height="18"/>'+leaf(3.8,4.8,7.6,14.4,'R')+leaf(12.6,4.8,7.6,14.4,'L');
  if(t==='3') s+='<rect x="1" y="4" width="22" height="16"/>'+leaf(2.4,5.4,5.9,13.2,'R')+leaf(9.05,5.4,5.9,13.2,'')+leaf(15.7,5.4,5.9,13.2,'L');
  if(t==='fix') s+='<rect x="4" y="3" width="16" height="18"/><rect x="6" y="5" width="12" height="14"/><path d="M8 17l8-10" stroke-width=".8"/>';
  if(t==='balkon') s+='<rect x="6" y="1" width="12" height="22"/>'+leaf(7.6,2.6,8.8,18.8,'L')+'<path d="M7.6 17h8.8"/>';
  return s+'</svg>';
}
/* Kótovaný technický náhled okna podle zadaných rozměrů */
function lineWin(t,wmm,hmm){
  var w=+wmm||1000,h=+hmm||1000,r=Math.max(.3,Math.min(3.2,w/h)),M=80,W,H;
  if(r>=1){W=M;H=M/r;}else{H=M;W=M*r;}
  var x=6,y=6,f=Math.max(3,Math.min(W,H)*.08),s='';
  function R(n){return Math.round(n*10)/10;}
  function sash(a,b,c,d,side,tilt){var o='<rect x="'+R(a)+'" y="'+R(b)+'" width="'+R(c)+'" height="'+R(d)+'" fill="#eef4fb"/>';
    if(side) o+='<path d="M'+R(side==='L'?a+c:a)+' '+R(b)+'L'+R(side==='L'?a:a+c)+' '+R(b+d/2)+'L'+R(side==='L'?a+c:a)+' '+R(b+d)+'" stroke-width=".8"/>';
    if(tilt) o+='<path d="M'+R(a)+' '+R(b+d)+'L'+R(a+c/2)+' '+R(b)+'L'+R(a+c)+' '+R(b+d)+'" stroke-width=".8" stroke-dasharray="2 1.6"/>';
    return o;}
  s+='<rect x="'+x+'" y="'+y+'" width="'+R(W)+'" height="'+R(H)+'" fill="#fff"/>';
  var ix=x+f,iy=y+f,iw=W-2*f,ih=H-2*f,g=f*.8,i,sw;
  if(t==='1') s+=sash(ix,iy,iw,ih,'L',1);
  else if(t==='2'){sw=(iw-g)/2; s+=sash(ix,iy,sw,ih,'R',0)+sash(ix+sw+g,iy,sw,ih,'L',1);}
  else if(t==='3'){sw=(iw-2*g)/3; s+=sash(ix,iy,sw,ih,'R',0)+sash(ix+sw+g,iy,sw,ih,'',0)+sash(ix+2*sw+2*g,iy,sw,ih,'L',1);}
  else if(t==='fix'){s+=sash(ix,iy,iw,ih,'',0)+'<path d="M'+R(ix+iw*.25)+' '+R(iy+ih*.75)+'L'+R(ix+iw*.75)+' '+R(iy+ih*.25)+'" stroke-width=".7"/>';}
  else if(t==='balkon'){s+=sash(ix,iy,iw,ih,'L',1)+'<path d="M'+R(ix)+' '+R(iy+ih*.8)+'H'+R(ix+iw)+'" stroke-width=".8"/>';}
  return '<svg viewBox="0 0 '+R(W+12)+' '+R(H+12)+'" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0a1e3c" stroke-width="1.2" aria-hidden="true">'+s+'</svg>';
}

/* ===================== Aplikace ===================== */
(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s);}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};
var MAP={"w":1000,"h":585,"regions":[{"id":"CZ-US","name":"Ústecký kraj","d":"M378.1,61 L381.9,48.6 L370.2,47.9 L373.6,34 L362.5,24.8 L349.2,25.4 L334,20 L328.6,33 L338,41.9 L346.7,45.7 L341.7,54.6 L325.8,54.5 L319.9,61.4 L298,71 L287.5,70.9 L278.1,75.5 L276.4,83.7 L269.7,87.8 L237.2,89.6 L225,93.9 L225.9,100.3 L215,114.3 L205.8,107.9 L192,119.9 L184.7,116.8 L179.7,129.2 L174,135.3 L152.9,135.6 L150.6,148.5 L145.4,153.7 L152.4,159.2 L161.5,160.6 L166.6,166.9 L182,173 L182.3,196.9 L187.7,209.8 L183.9,215.7 L189.8,221.2 L201.1,228.4 L206.1,226.4 L219.9,215.9 L224.1,208.9 L243.1,198.6 L251.4,198.6 L265,191.9 L269.3,193.5 L282.9,184.1 L290.7,175 L324.6,176.5 L340.4,171.4 L346.9,155.2 L355.1,149.6 L358.6,139.7 L357.6,134.7 L347.7,126.3 L340.1,101.4 L349.8,86.2 L357.5,67.8 L364.7,75.4 L370.8,66.1 L378.1,61Z","lx":269.8,"ly":137.1,"s":"Ústecký"},{"id":"CZ-LI","name":"Liberecký kraj","d":"M358.6,139.7 L372.8,140 L374.4,144.5 L390.7,141.4 L407.9,130.7 L419.7,116.6 L443,122.3 L450.6,136 L465.4,142.9 L471.5,136 L480.5,137.9 L487.4,145.6 L494.2,144.3 L495.9,135.5 L517.3,140.8 L519.5,134.6 L514.6,123.6 L514.7,112 L511.1,100.7 L512.1,92.9 L505.4,77.1 L494.2,73.2 L481.4,76.8 L480.1,66.3 L472.7,61.2 L467.9,48.1 L470.3,39.7 L464.3,34.2 L449.4,33 L443,28.6 L432.3,27.4 L430.2,60.1 L406.2,60.1 L401.3,70.1 L390.8,69.3 L378.1,61 L370.8,66.1 L364.7,75.4 L357.5,67.8 L349.8,86.2 L340.1,101.4 L347.7,126.3 L357.6,134.7 L358.6,139.7Z","lx":421.1,"ly":87.6,"s":"Liberecký"},{"id":"CZ-KA","name":"Karlovarský kraj","d":"M145.4,153.7 L139.5,154.3 L126.7,146 L116.6,147 L105.7,155.7 L98.2,154.1 L82,155.9 L75.8,165.2 L65.6,171.5 L56.4,183.6 L48,204.5 L41.7,182.9 L34.1,180.4 L30.5,170.8 L24.4,175.1 L20,185.5 L33.9,202 L34,216.9 L41.8,230 L72.4,247.7 L71.3,256.3 L79.8,262.4 L92.9,259.4 L103.8,260.5 L109.2,255.1 L137.6,258.4 L141.2,247.5 L159.9,236.5 L179.8,243.7 L179.2,233.3 L187.4,231.7 L189.8,221.2 L183.9,215.7 L187.7,209.8 L182.3,196.9 L182,173 L166.6,166.9 L161.5,160.6 L152.4,159.2 L145.4,153.7Z","lx":110.9,"ly":207.4,"s":"Karlovarský"},{"id":"CZ-PL","name":"Plzeňský kraj","d":"M189.8,221.2 L187.4,231.7 L179.2,233.3 L179.8,243.7 L159.9,236.5 L141.2,247.5 L137.6,258.4 L109.2,255.1 L103.8,260.5 L92.9,259.4 L79.8,262.4 L68.6,289.5 L58.4,297.2 L63.2,306.8 L73.9,313.9 L73.7,321.8 L81.4,332.9 L86.5,348.5 L90.7,349.8 L92.9,367.5 L104.9,376.4 L114.3,390.7 L132.3,390.2 L143.1,398.9 L163.7,430.4 L167.6,438.5 L185,444.4 L195.2,456.9 L196.6,466.9 L210.5,479.5 L216.5,472.6 L227.5,453.3 L229.8,438.7 L235.7,436.3 L241.1,427.4 L244.4,408.5 L249,405.1 L255.8,391.2 L256.3,370.8 L252.7,359 L254.1,348.8 L251.1,335.5 L246.2,329.9 L244.2,316.4 L260.6,304.7 L257.8,300.3 L261.6,278.5 L265.7,276.6 L262.8,263.6 L238.2,246.9 L228,246.2 L214.6,236.7 L207.1,238.7 L206.1,226.4 L201.1,228.4 L189.8,221.2Z","lx":174.2,"ly":322.6,"s":"Plzeňský"},{"id":"CZ-JC","name":"Jihočeský kraj","d":"M216.5,472.6 L226.2,478.3 L235.1,492.3 L245.2,495.8 L255.2,515.2 L282,531.9 L289.1,540.7 L285.2,546.7 L295,557.4 L315.6,560.1 L330,565.4 L343.2,559.3 L348.9,548.4 L360.3,554.2 L368.6,552.1 L385.6,559.1 L386.9,540.7 L397.5,529.6 L401.2,518.1 L418.5,521.5 L425.7,494.4 L425.3,475.3 L427.9,467.4 L450.4,470.8 L451,483 L464.9,480.1 L468.5,473.1 L479,474.8 L498.8,483.2 L509.3,490.7 L513.7,476.7 L502.4,467.6 L510.4,452.2 L515.8,447.6 L509,440.8 L488.6,441.8 L481.7,435.3 L478.5,424.3 L460.5,418.1 L454.3,423.1 L435.1,407 L430.1,409.5 L419.4,403 L414.4,386.4 L417.5,374.5 L415.2,359.2 L420.1,349.3 L407,342 L398.4,334 L392.8,345.8 L378.7,354.4 L370.3,351.9 L344.5,350.4 L335.2,354.1 L328.7,347.6 L320.5,347 L306.6,351.7 L289.7,349.6 L287.3,354.4 L275.9,358.8 L261.1,354.3 L252.7,359 L256.3,370.8 L255.8,391.2 L249,405.1 L244.4,408.5 L241.1,427.4 L235.7,436.3 L229.8,438.7 L227.5,453.3 L216.5,472.6Z","lx":366.9,"ly":452.6,"s":"Jihočeský"},{"id":"CZ-KR","name":"Královéhradecký kraj","d":"M450.6,136 L452.4,160 L449.3,173.7 L456.3,176.8 L460.6,185.6 L480.9,188 L485.8,208.9 L482.5,213.6 L489.8,226.6 L498.7,229.4 L507.3,221.3 L524.1,221.2 L533.3,224.4 L536.7,216 L543.7,213.9 L549.8,224 L558.8,215.1 L569.9,215.4 L573.5,225.9 L600.2,243.8 L617.1,240 L623,231.5 L637.6,224.3 L640.8,215.3 L655.9,219.9 L648.6,202.4 L634.6,182.7 L625.2,178.4 L619.8,166.7 L609.8,168.4 L599.4,155.4 L602.3,149.4 L615.2,139.4 L626.2,135.3 L630.8,119.3 L618.7,106.8 L602.9,103.6 L596.9,111.4 L584.4,106.5 L575.8,115 L568.3,99.7 L564.1,97.6 L551,100.6 L539.7,85.4 L528.1,88.3 L522.1,82.9 L505.4,77.1 L512.1,92.9 L511.1,100.7 L514.7,112 L514.6,123.6 L519.5,134.6 L517.3,140.8 L495.9,135.5 L494.2,144.3 L487.4,145.6 L480.5,137.9 L471.5,136 L465.4,142.9 L450.6,136Z","lx":556.5,"ly":167.2,"s":"Královéhradecký"},{"id":"CZ-OL","name":"Olomoucký kraj","d":"M768.7,185.6 L761.2,186.4 L758.4,175.7 L743.4,172.2 L739.6,163.7 L701.4,152.3 L694.4,154.3 L703.4,176.9 L712.2,184.2 L708.6,196 L696,205.5 L687.6,231.3 L687.5,240.5 L676.5,249.1 L679.9,265.5 L678.1,285.3 L692.9,310.8 L687,333.7 L680.9,345.5 L687.1,351.4 L689.5,366.7 L687.7,376.5 L695.7,382.4 L703.3,375.5 L699.3,358.8 L711.8,362.3 L715.5,373 L722.3,379.3 L723.3,386.4 L735.4,394.3 L740,406.5 L746.7,400.5 L757.7,399.8 L766.1,389 L764.2,376.4 L784.2,384.9 L796.1,376.1 L806.3,376 L807.8,367.8 L814.1,365.7 L826.8,367.8 L836.2,351.3 L847.2,347.3 L839,342.6 L837.3,336.3 L826.3,328.3 L821.6,319.2 L813.2,316.8 L813.8,309.6 L805.3,303.1 L796.6,304.7 L777.1,303.2 L765.8,291.6 L758.8,293.8 L734.9,279.5 L739.8,261.6 L735.7,250.8 L743.9,238.7 L742.6,229.3 L747.8,215.5 L766.6,204.2 L771.2,198.5 L768.7,185.6Z","lx":734.4,"ly":314.1,"s":"Olomoucký"},{"id":"CZ-PA","name":"Pardubický kraj","d":"M489.8,226.6 L487.4,238.8 L482.6,245.5 L491.7,249.8 L503.4,260.2 L500.5,276.7 L515.4,292.1 L526.2,291.1 L539.1,297.8 L553.8,315.1 L563.2,316.7 L573.2,308 L590.5,317.2 L597.3,317 L611.7,324.9 L614.9,329.6 L630.2,337 L650.6,335.3 L654.6,328.6 L674.8,329.5 L687,333.7 L692.9,310.8 L678.1,285.3 L679.9,265.5 L676.5,249.1 L687.5,240.5 L687.6,231.3 L696,205.5 L688.6,206.3 L672.5,226.8 L666.8,227.3 L655.9,219.9 L640.8,215.3 L637.6,224.3 L623,231.5 L617.1,240 L600.2,243.8 L573.5,225.9 L569.9,215.4 L558.8,215.1 L549.8,224 L543.7,213.9 L536.7,216 L533.3,224.4 L524.1,221.2 L507.3,221.3 L498.7,229.4 L489.8,226.6Z","lx":613.3,"ly":278.2,"s":"Pardubický"},{"id":"CZ-MO","name":"Moravskoslezský kraj","d":"M847.2,347.3 L853.5,347.2 L859.4,354.3 L881.6,351.3 L888.4,355 L899.3,354.4 L910.2,365.8 L917.3,377.7 L935.1,363.1 L937.7,353.9 L952.9,350.2 L965.9,353 L971.5,347.4 L980,345.8 L979.8,337.6 L969.8,309.8 L963.4,311.6 L950.2,305.3 L939.1,282.7 L937.1,260.3 L926.2,263 L909.9,255.9 L901.3,261.2 L893.7,253.5 L880.1,246.2 L871,244.8 L869.9,238.7 L834.4,249.5 L823.3,238.5 L816.7,226.4 L804.3,221.2 L797.1,212.7 L799.3,208 L809.8,206 L818.5,199.6 L815.9,190.8 L817.4,180.5 L810.2,175.7 L799.6,187.9 L780.2,186.8 L776.2,192 L768.7,185.6 L771.2,198.5 L766.6,204.2 L747.8,215.5 L742.6,229.3 L743.9,238.7 L735.7,250.8 L739.8,261.6 L734.9,279.5 L758.8,293.8 L765.8,291.6 L777.1,303.2 L796.6,304.7 L805.3,303.1 L813.8,309.6 L813.2,316.8 L821.6,319.2 L826.3,328.3 L837.3,336.3 L839,342.6 L847.2,347.3Z","lx":854.3,"ly":293.9,"s":"Moravskoslezský"},{"id":"CZ-JM","name":"Jihomoravský kraj","d":"M509.3,490.7 L529.2,500.4 L549.1,497.2 L552.3,502.1 L580.3,522.1 L588.1,525.4 L601.5,524.5 L627.8,528.4 L638.9,513.5 L649.7,511 L669.1,516.6 L672,524.9 L689.3,530.4 L702.8,529 L706.3,533.8 L708.6,548.3 L717.9,543.9 L724.8,522.5 L744.9,497.1 L758.4,497.2 L775.2,505.2 L788.6,500.8 L798.5,506 L814.5,499.2 L808.2,486.4 L799.3,483.7 L796,476.3 L780.6,476.9 L771.2,470.5 L768.6,463.7 L751.8,456.8 L749.6,446.8 L735.5,446.5 L748.3,431.5 L738.9,418.8 L740,406.5 L735.4,394.3 L723.3,386.4 L722.3,379.3 L715.5,373 L711.8,362.3 L699.3,358.8 L703.3,375.5 L695.7,382.4 L687.7,376.5 L689.5,366.7 L687.1,351.4 L680.9,345.5 L687,333.7 L674.8,329.5 L654.6,328.6 L650.6,335.3 L630.2,337 L627.6,346.4 L631.9,352.3 L627.4,361.2 L627.7,376.4 L630.3,390.3 L617.8,398.1 L615.4,411.9 L610.6,416.1 L614.4,429 L612.3,441.8 L608,450 L597.8,453.3 L591.6,459.9 L581.6,458.4 L571.5,460.6 L566.6,457.3 L556.5,468.2 L547.5,469.6 L537,479.2 L528,475.4 L521.4,480.8 L513.7,476.7 L509.3,490.7Z","lx":683.1,"ly":444.4,"s":"Jihomoravský"},{"id":"CZ-ZL","name":"Zlínský kraj","d":"M740,406.5 L738.9,418.8 L748.3,431.5 L735.5,446.5 L749.6,446.8 L751.8,456.8 L768.6,463.7 L771.2,470.5 L780.6,476.9 L796,476.3 L799.3,483.7 L808.2,486.4 L814.5,499.2 L826.1,494.2 L835.6,481.2 L845,480.7 L852.1,460.9 L866.3,458.5 L875.2,452 L878.8,442 L880.1,417.6 L889.9,400.9 L908.9,392.6 L917.3,385.5 L917.3,377.7 L910.2,365.8 L899.3,354.4 L888.4,355 L881.6,351.3 L859.4,354.3 L853.5,347.2 L847.2,347.3 L836.2,351.3 L826.8,367.8 L814.1,365.7 L807.8,367.8 L806.3,376 L796.1,376.1 L784.2,384.9 L764.2,376.4 L766.1,389 L757.7,399.8 L746.7,400.5 L740,406.5Z","lx":830.7,"ly":423.5,"s":"Zlínský"},{"id":"CZ-VY","name":"Kraj Vysočina","d":"M513.7,476.7 L521.4,480.8 L528,475.4 L537,479.2 L547.5,469.6 L556.5,468.2 L566.6,457.3 L571.5,460.6 L581.6,458.4 L591.6,459.9 L597.8,453.3 L608,450 L612.3,441.8 L614.4,429 L610.6,416.1 L615.4,411.9 L617.8,398.1 L630.3,390.3 L627.7,376.4 L627.4,361.2 L631.9,352.3 L627.6,346.4 L630.2,337 L614.9,329.6 L611.7,324.9 L597.3,317 L590.5,317.2 L573.2,308 L563.2,316.7 L553.8,315.1 L539.1,297.8 L526.2,291.1 L515.4,292.1 L500.5,276.7 L493.6,293.6 L486,294.8 L469.2,305.2 L462.4,305.5 L456.2,320 L462.6,324.8 L464.9,333.9 L453.6,339.3 L436.1,340 L428.7,337.5 L420.1,349.3 L415.2,359.2 L417.5,374.5 L414.4,386.4 L419.4,403 L430.1,409.5 L435.1,407 L454.3,423.1 L460.5,418.1 L478.5,424.3 L481.7,435.3 L488.6,441.8 L509,440.8 L515.8,447.6 L510.4,452.2 L502.4,467.6 L513.7,476.7Z","lx":541.8,"ly":379.2,"s":"Vysočina"},{"id":"CZ-ST","name":"Středočeský kraj","d":"M206.1,226.4 L207.1,238.7 L214.6,236.7 L228,246.2 L238.2,246.9 L262.8,263.6 L265.7,276.6 L261.6,278.5 L257.8,300.3 L260.6,304.7 L244.2,316.4 L246.2,329.9 L251.1,335.5 L254.1,348.8 L252.7,359 L261.1,354.3 L275.9,358.8 L287.3,354.4 L289.7,349.6 L306.6,351.7 L320.5,347 L328.7,347.6 L335.2,354.1 L344.5,350.4 L370.3,351.9 L378.7,354.4 L392.8,345.8 L398.4,334 L407,342 L420.1,349.3 L428.7,337.5 L436.1,340 L453.6,339.3 L464.9,333.9 L462.6,324.8 L456.2,320 L462.4,305.5 L469.2,305.2 L486,294.8 L493.6,293.6 L500.5,276.7 L503.4,260.2 L491.7,249.8 L482.6,245.5 L487.4,238.8 L489.8,226.6 L482.5,213.6 L485.8,208.9 L480.9,188 L460.6,185.6 L456.3,176.8 L449.3,173.7 L452.4,160 L450.6,136 L443,122.3 L419.7,116.6 L407.9,130.7 L390.7,141.4 L374.4,144.5 L372.8,140 L358.6,139.7 L355.1,149.6 L346.9,155.2 L340.4,171.4 L324.6,176.5 L290.7,175 L282.9,184.1 L269.3,193.5 L265,191.9 L251.4,198.6 L243.1,198.6 L224.1,208.9 L219.9,215.9 L206.1,226.4ZM373.2,249.8 L334.7,257.7 L334.4,251.1 L324.6,235.7 L321,225.4 L339.3,217.3 L358,212.2 L368.1,212.7 L373.8,219.5 L386.9,228.5 L381.5,236.5 L381.6,248.8 L373.2,249.8Z","lx":353.8,"ly":303.5,"s":"Středočeský"},{"id":"CZ-PR","name":"Hlavní město Praha","d":"M373.2,249.8 L381.6,248.8 L381.5,236.5 L386.9,228.5 L373.8,219.5 L368.1,212.7 L358,212.2 L339.3,217.3 L321,225.4 L324.6,235.7 L334.4,251.1 L334.7,257.7 L373.2,249.8Z","lx":353.6,"ly":234.2,"s":"Praha"}],"outline":"M145.4,153.7 L139.5,154.3 L126.7,146 L116.6,147 L105.7,155.7 L98.2,154.1 L82,155.9 L75.8,165.2 L65.6,171.5 L56.4,183.6 L48,204.5 L41.7,182.9 L34.1,180.4 L30.5,170.8 L24.4,175.1 L20,185.5 L33.9,202 L34,216.9 L41.8,230 L72.4,247.7 L71.3,256.3 L79.8,262.4 L68.6,289.5 L58.4,297.2 L63.2,306.8 L73.9,313.9 L73.7,321.8 L81.4,332.9 L86.5,348.5 L90.7,349.8 L92.9,367.5 L104.9,376.4 L114.3,390.7 L132.3,390.2 L143.1,398.9 L163.7,430.4 L167.6,438.5 L185,444.4 L195.2,456.9 L196.6,466.9 L210.5,479.5 L216.5,472.6 L226.2,478.3 L235.1,492.3 L245.2,495.8 L255.2,515.2 L282,531.9 L289.1,540.7 L285.2,546.7 L295,557.4 L315.6,560.1 L330,565.4 L343.2,559.3 L348.9,548.4 L360.3,554.2 L368.6,552.1 L385.6,559.1 L386.9,540.7 L397.5,529.6 L401.2,518.1 L418.5,521.5 L425.7,494.4 L425.3,475.3 L427.9,467.4 L450.4,470.8 L451,483 L464.9,480.1 L468.5,473.1 L479,474.8 L498.8,483.2 L509.3,490.7 L529.2,500.4 L549.1,497.2 L552.3,502.1 L580.3,522.1 L588.1,525.4 L601.5,524.5 L627.8,528.4 L638.9,513.5 L649.7,511 L669.1,516.6 L672,524.9 L689.3,530.4 L702.8,529 L706.3,533.8 L708.6,548.3 L717.9,543.9 L724.8,522.5 L744.9,497.1 L758.4,497.2 L775.2,505.2 L788.6,500.8 L798.5,506 L814.5,499.2 L826.1,494.2 L835.6,481.2 L845,480.7 L852.1,460.9 L866.3,458.5 L875.2,452 L878.8,442 L880.1,417.6 L889.9,400.9 L908.9,392.6 L917.3,385.5 L917.3,377.7 L935.1,363.1 L937.7,353.9 L952.9,350.2 L965.9,353 L971.5,347.4 L980,345.8 L979.8,337.6 L969.8,309.8 L963.4,311.6 L950.2,305.3 L939.1,282.7 L937.1,260.3 L926.2,263 L909.9,255.9 L901.3,261.2 L893.7,253.5 L880.1,246.2 L871,244.8 L869.9,238.7 L834.4,249.5 L823.3,238.5 L816.7,226.4 L804.3,221.2 L797.1,212.7 L799.3,208 L809.8,206 L818.5,199.6 L815.9,190.8 L817.4,180.5 L810.2,175.7 L799.6,187.9 L780.2,186.8 L776.2,192 L768.7,185.6 L761.2,186.4 L758.4,175.7 L743.4,172.2 L739.6,163.7 L701.4,152.3 L694.4,154.3 L703.4,176.9 L712.2,184.2 L708.6,196 L696,205.5 L688.6,206.3 L672.5,226.8 L666.8,227.3 L655.9,219.9 L648.6,202.4 L634.6,182.7 L625.2,178.4 L619.8,166.7 L609.8,168.4 L599.4,155.4 L602.3,149.4 L615.2,139.4 L626.2,135.3 L630.8,119.3 L618.7,106.8 L602.9,103.6 L596.9,111.4 L584.4,106.5 L575.8,115 L568.3,99.7 L564.1,97.6 L551,100.6 L539.7,85.4 L528.1,88.3 L522.1,82.9 L505.4,77.1 L494.2,73.2 L481.4,76.8 L480.1,66.3 L472.7,61.2 L467.9,48.1 L470.3,39.7 L464.3,34.2 L449.4,33 L443,28.6 L432.3,27.4 L430.2,60.1 L406.2,60.1 L401.3,70.1 L390.8,69.3 L378.1,61 L381.9,48.6 L370.2,47.9 L373.6,34 L362.5,24.8 L349.2,25.4 L334,20 L328.6,33 L338,41.9 L346.7,45.7 L341.7,54.6 L325.8,54.5 L319.9,61.4 L298,71 L287.5,70.9 L278.1,75.5 L276.4,83.7 L269.7,87.8 L237.2,89.6 L225,93.9 L225.9,100.3 L215,114.3 L205.8,107.9 L192,119.9 L184.7,116.8 L179.7,129.2 L174,135.3 L152.9,135.6 L150.6,148.5 L145.4,153.7Z","cities":{"dacice":{"name":"Dačice","x":493.7,"y":451.4},"praha":{"name":"Praha","x":352.1,"y":231.8},"brno":{"name":"Brno","x":662.4,"y":425.0},"plzen":{"name":"Plzeň","x":199.5,"y":303.0},"cb":{"name":"České Budějovice","x":354.3,"y":474.0},"jihlava":{"name":"Jihlava","x":515.8,"y":382.1},"hk":{"name":"Hradec Králové","x":548.4,"y":202.8},"jh":{"name":"Jindřichův Hradec","x":431.1,"y":437.4},"usti":{"name":"Ústí nad Labem","x":297.1,"y":102.2},"liberec":{"name":"Liberec","x":440.1,"y":80.6},"kv":{"name":"Karlovy Vary","x":131.7,"y":192.3},"olomouc":{"name":"Olomouc","x":753.0,"y":335.4},"pardubice":{"name":"Pardubice","x":542.4,"y":241.6},"ostrava":{"name":"Ostrava","x":895.7,"y":280.9},"zlin":{"name":"Zlín","x":815.5,"y":414.5}}};
var PH={"hero": {"src": "https://images.unsplash.com/photo-1760783320571-36ebe8b9a350?auto=format&fit=crop&q=72&w={w}", "alt": "Rodinný dům s oranžovou taškovou střechou"}, "pvc": {"src": "https://images.unsplash.com/photo-1730718949490-8bb461a9d9bc?auto=format&fit=crop&q=72&w={w}", "alt": "Plastové okno s klikou"}, "pvc2": {"src": "https://images.unsplash.com/photo-1730718934488-2857906d23d2?auto=format&fit=crop&q=72&w={w}", "alt": "Klika plastového okna – detail"}, "alu": {"src": "https://images.unsplash.com/photo-1758998256408-ab2c9fbec19b?auto=format&fit=crop&q=72&w={w}", "alt": "Prosklené dveře v černém rámu"}, "euro": {"src": "https://images.unsplash.com/photo-1569216961559-fd512349ebba?auto=format&fit=crop&q=72&w={w}", "alt": "Otevřené okno v dřevěném rámu"}, "door": {"src": "https://images.unsplash.com/photo-1730718934352-504ab21fc22a?auto=format&fit=crop&q=72&w={w}", "alt": "Klika dveří – detail"}, "balkon": {"src": "https://images.unsplash.com/photo-1730718928349-8af807c6bc22?auto=format&fit=crop&q=72&w={w}", "alt": "Obývací pokoj s prosklenými posuvnými dveřmi"}, "garden": {"src": "https://images.unsplash.com/photo-1783587354871-029252330061?auto=format&fit=crop&q=72&w={w}", "alt": "Dům s prosklenou zimní zahradou"}, "garden2": {"src": "https://images.unsplash.com/photo-1767487558061-4ce6c5d5f92d?auto=format&fit=crop&q=72&w={w}", "alt": "Zimní zahrada s citrusy"}, "garage": {"src": "https://images.unsplash.com/photo-1776860155275-eee24bfb1dee?auto=format&fit=crop&q=72&w={w}", "alt": "Novostavba rodinného domu s garážovými vraty"}, "sky": {"src": "https://images.unsplash.com/photo-1542676012084-a4b1f610452a?auto=format&fit=crop&q=72&w={w}", "alt": "Prosklený strop s bílými rámy"}, "svj": {"src": "https://images.unsplash.com/photo-1790110468684-d7908573cc3b?auto=format&fit=crop&q=72&w={w}", "alt": "Panelový bytový dům s balkony"}, "cta": {"src": "https://images.unsplash.com/photo-1774430161190-d5b36474770e?auto=format&fit=crop&q=72&w={w}", "alt": "Sluneční světlo procházející oknem"}};
var REDUCED=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function img(k,w,cls){var p=PH[k];return '<img src="'+p.src.replace('{w}',w||800)+'" alt="'+p.alt+'" loading="lazy" decoding="async"'+(cls?' class="'+cls+'"':'')+' onerror="this.parentNode.classList.add(\'ph-err\')">';}

/* Texty produktů – pouze údaje z plastova-okna.org */
var PRODUCTS=[
  {k:'pvc',n:'Plastová okna',d:'Pěti-, šesti- i osmikomorové profily Rehau, Deceuninck, Kömmerling, Veka, Aluplast, Salamander a další.',a:'#plastova-okna',badge:'Akce trojsklo'},
  {k:'alu',n:'Hliníková okna',d:'Systémy HEROAL, REYNAERS a HARTMANN. Přes 400 barev RAL.',a:'#hlinik'},
  {k:'euro',n:'Eurookna',d:'Výrazné množstevní slevy 40–55 %. Cenová nabídka zdarma.',a:''},
  {k:'door',n:'Vchodové dveře',d:'Vchodové dveře, plastové i hliníkové dveře.',a:''},
  {k:'balkon',n:'Balkónové dveře',d:'Balkónové dveře a hliníkové balkónové stěny.',a:''},
  {k:'garden',n:'Zimní zahrady',d:'Hliníkové zimní zahrady i střešní okna zimních zahrad. Poptávka zdarma.',a:'#hlinik'},
  {k:'garage',n:'Garážová vrata',d:'Doprava – montáž po celé ČR, včetně Prahy a okolí.',a:''},
  {k:'sky',n:'Střešní světlíky',d:'Cenovou nabídku vám vypracujeme zdarma a nezávazně.',a:''}
];
var PNAME={}; PRODUCTS.forEach(function(p){PNAME[p.k]=p.n;});
var COLORS=[{k:'Bílá',c:'#f4f6f8'},{k:'Zlatý dub',c:'#a6682f'},{k:'Dub',c:'#b98c58'},{k:'Borovice',c:'#d0a46b'},{k:'Oregon',c:'#b0703c'},{k:'Jiná barva RAL',c:'conic-gradient(#d6211a,#f2b705,#1d7a3e,#0d5cb6,#d6211a)'}];
var KRAJ_ORDER=['CZ-PR','CZ-ST','CZ-JC','CZ-PL','CZ-KA','CZ-US','CZ-LI','CZ-KR','CZ-PA','CZ-VY','CZ-JM','CZ-OL','CZ-ZL','CZ-MO'];

/* ---------- Datum dodání (4–6 týdnů od zálohy) ---------- */
function fmt(d,y){return d.getDate()+'. '+(d.getMonth()+1)+'.'+(y?' '+d.getFullYear():'');}
(function(){var t=new Date(), a=new Date(t.getTime()+28*864e5), b=new Date(t.getTime()+42*864e5);
  var txt=a.getFullYear()===b.getFullYear()? fmt(a)+' – '+fmt(b,1) : fmt(a,1)+' – '+fmt(b,1);
  $$('[data-delivery]').forEach(function(e){e.textContent=txt;});})();

/* ---------- Header ---------- */
var hdr=$('#hdr');
window.addEventListener('scroll',function(){hdr.classList.toggle('scrolled',window.scrollY>10);},{passive:true});
var mnav=$('#mnav');
function mOpen(o){mnav.classList.toggle('open',o);mnav.setAttribute('aria-hidden',!o);if(o)mnav.removeAttribute('inert');else mnav.setAttribute('inert','');document.body.style.overflow=o?'hidden':'';}
$('#burger').addEventListener('click',function(){mOpen(true);});
$('#mclose').addEventListener('click',function(){mOpen(false);});
mnav.addEventListener('click',function(e){if(e.target===mnav||e.target.closest('a'))mOpen(false);});

/* ---------- Produkty ---------- */
$('#prodGrid').innerHTML=PRODUCTS.map(function(p,i){
  return '<article class="prod rv rv-d'+(i%4)+'"><div class="prod-img ph">'+(p.badge?'<span class="tag prod-badge">'+p.badge+'</span>':'')+img(p.k,700)+'</div>'
   +'<div class="prod-body"><h3>'+p.n+'</h3><p>'+p.d+'</p><div class="prod-acts">'
   +(p.a?'<a class="more" href="'+p.a+'">Více<svg class="ico"><use href="#i-arrow"/></svg></a>':'<span class="free"><svg class="ico"><use href="#i-check"/></svg>Nabídka zdarma</span>')
   +'<a class="ask" href="#kalkulace" data-go="calc" data-prod="'+p.k+'">Poptat cenu<svg class="ico"><use href="#i-arrow"/></svg></a></div></div></article>';
}).join('');

/* ---------- Plastová okna – přepínač ---------- */
var prof={ch:6,gl:3};
function renderProf(){
  $('[data-s=profil]').innerHTML=prof.ch+'komorový'+(prof.ch===6?' <span class="tag">Aluplast – za cenu pětikomorového</span>':'');
  var pr=$('[data-row=param]'); pr.style.display=prof.ch===6?'':'none';
  $('[data-s=param]').textContent='stavební hloubka 80 mm, U = 1,1 W/m²K';
  $('[data-s=sklo]').innerHTML=prof.gl===3?'Izolační trojsklo Ug = 0,7 W/m²K <span class="tag">bez příplatku</span><br><small>pro nízkoenergetické a pasivní domy</small>':'Izolační dvojsklo';
  $('#lfCh').textContent=prof.ch;
  $('#lfGl').textContent=prof.gl===3?'Ug 0,7 W/m²K':'dvojsklo';
  var l=$('#lfPr'); l.textContent=prof.gl===3?'0 Kč – akce':'—'; l.classList.toggle('red',prof.gl===3);
  $$('#pvcSpec td').forEach(function(td){td.classList.remove('flash');void td.offsetWidth;td.classList.add('flash');});
}
$$('#segCh button').forEach(function(b){b.addEventListener('click',function(){$$('#segCh button').forEach(function(x){x.classList.toggle('on',x===b);});prof.ch=+b.dataset.ch;renderProf();});});
$$('#segGl button').forEach(function(b){b.addEventListener('click',function(){$$('#segGl button').forEach(function(x){x.classList.toggle('on',x===b);});prof.gl=+b.dataset.gl;renderProf();});});
renderProf();

/* ---------- Mapa ---------- */
var selKraj='';
function krajName(id){var r=MAP&&MAP.regions.filter(function(x){return x.id===id;})[0];return r?r.name:'';}
function buildMap(){
  if(!MAP)return;
  var C=MAP.cities, s='<svg viewBox="0 0 '+MAP.w+' '+MAP.h+'" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Mapa krajů ČR">';
  MAP.regions.forEach(function(r,i){s+='<path class="kraj" style="--d:'+(i*70)+'ms" data-id="'+r.id+'" tabindex="0" role="button" aria-label="'+r.name+' – doprava a montáž" d="'+r.d+'"/>';});
  s+='<path class="cz-outline" d="'+MAP.outline+'"/>';
  MAP.regions.forEach(function(r,i){s+='<text class="kraj-l'+(r.id==='CZ-PR'?' kl-pr':'')+'" x="'+r.lx+'" y="'+r.ly+'">'+r.s+'</text>';});
  s+='</svg>';
  $('#mapBox').insertAdjacentHTML('afterbegin',s);
  var tip=$('#mapTip'), box=$('#mapBox');
  $$('#mapBox .kraj').forEach(function(p){
    var id=p.dataset.id, n=krajName(id);
    p.addEventListener('mousemove',function(e){var b=box.getBoundingClientRect();tip.innerHTML=n+'<small>✓ Doprava – montáž</small>';tip.style.left=(e.clientX-b.left)+'px';tip.style.top=(e.clientY-b.top)+'px';tip.classList.add('on');});
    p.addEventListener('mouseleave',function(){tip.classList.remove('on');});
    p.addEventListener('click',function(){selectKraj(id);});
    p.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();selectKraj(id);}});
  });
  var opts=KRAJ_ORDER.map(function(id){return '<option value="'+id+'">'+krajName(id)+'</option>';}).join('');
  $('#mpSelect').insertAdjacentHTML('beforeend',opts); $('#kraj').insertAdjacentHTML('beforeend',opts);
  $('#mpSelect').addEventListener('change',function(){selectKraj(this.value);});
}
function selectKraj(id){
  selKraj=id;
  $$('#mapBox .kraj').forEach(function(p){p.classList.toggle('sel',p.dataset.id===id);});
  $$('#mapBox .kraj-l').forEach(function(t,i){t.classList.toggle('sel',MAP.regions[i].id===id);});
  $('#mpSelect').value=id||''; $('#kraj').value=id||'';
  if(!id){$('#mpEyebrow').textContent='Kde montujeme';$('#mpTitle').textContent='Celá Česká republika';$('#mpText').innerHTML='Klikněte na svůj kraj v mapě nebo jej vyberte ze seznamu.';
    $('#mpBtn').innerHTML='Poptat okna v mém kraji<svg class="ico ico-arrow"><use href="#i-arrow"/></svg>';sumRender();return;}
  var n=krajName(id);
  $('#mpEyebrow').textContent='Vybraný kraj';
  $('#mpTitle').textContent=n;
  $('#mpText').innerHTML='<b class="mp-yes"><svg class="ico"><use href="#i-check"/></svg>Doprava – montáž v tomto kraji</b>';
  $('#mpBtn').innerHTML='Poptat okna – '+n.replace(' kraj','').replace('Hlavní město ','')+'<svg class="ico ico-arrow"><use href="#i-arrow"/></svg>';
  sumRender();
}
buildMap();

/* ---------- Reveal & počítadla ---------- */
function countUp(el){var to=+el.dataset.count, t0=null, dur=1200; if(REDUCED){el.textContent=to;return;}
  function f(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e);if(p<1)requestAnimationFrame(f);}
  requestAnimationFrame(f);}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;
  t.classList.add('in'); $$('[data-count]',t).forEach(countUp);
  if(t.classList.contains('map-grid'))$('#mapBox').classList.add('map-in');
  io.unobserve(t);});},{threshold:.15,rootMargin:'0px 0px -40px 0px'});
$$('.rv,#steps').forEach(function(el){io.observe(el);});
$$('[data-count]').forEach(function(el){el.textContent='0';});
requestAnimationFrame(function(){$$('.hero .rv').forEach(function(e){e.classList.add('in');});$('.hero').classList.add('in');});

/* ===================== FORMULÁŘ ===================== */
var st={products:{},rows:[{t:'2',w:1200,h:1400,n:1}],noDim:false,step:0,files:[]};
var TN={'1':'Jednokřídlé','2':'Dvoukřídlé','3':'Trojkřídlé','balkon':'Balkónové dveře','fix':'Pevné (fix)'};
var TDEF={'1':[800,1200],'2':[1200,1400],'3':[1800,1400],'balkon':[800,2200],'fix':[1000,1000]};
$('#pTiles').innerHTML=PRODUCTS.map(function(p){return '<label class="ptile" data-k="'+p.k+'"><input type="checkbox" value="'+p.k+'"><span class="pt-chk"><svg class="ico"><use href="#i-check"/></svg></span><span class="pt-img ph">'+img(p.k,320)+'</span><span class="pt-n">'+p.n+'</span></label>';}).join('');
function setProd(k,on){st.products[k]=on; var t=$('.ptile[data-k="'+k+'"]'); if(t){t.classList.toggle('on',!!on);$('input',t).checked=!!on;}}
$$('.ptile input').forEach(function(i){i.addEventListener('change',function(){setProd(i.value,i.checked);sumRender();hideErr();});});
$('#colChips').innerHTML=COLORS.map(function(c,i){return '<label class="chip"><input type="radio" name="barva" value="'+c.k+'"'+(i===0?' checked':'')+'><span><i class="sw-dot" style="background:'+c.c+'"></i>'+c.k+'</span></label>';}).join('');

function rowHTML(r,i){
  return '<div class="wrow" data-i="'+i+'"><div class="wrow-prev">'+lineWin(r.t,r.w,r.h)+'<span class="wrow-dim">'+(r.w||'?')+' × '+(r.h||'?')+'</span></div><div class="wrow-main">'
   +'<div class="wtypes">'+Object.keys(TN).map(function(t){return '<button type="button" data-t="'+t+'" class="'+(r.t===t?'on':'')+'" title="'+TN[t]+'">'+typeIcon(t)+TN[t]+'</button>';}).join('')+'</div>'
   +'<div class="wdims"><label class="fld"><span>Šířka</span><span class="inp-u"><input type="number" data-f="w" value="'+r.w+'" min="300" max="6000" step="10" inputmode="numeric"><em>mm</em></span></label><span class="wx">×</span>'
   +'<label class="fld"><span>Výška</span><span class="inp-u"><input type="number" data-f="h" value="'+r.h+'" min="300" max="4000" step="10" inputmode="numeric"><em>mm</em></span></label>'
   +'<label class="fld"><span>Počet</span><span class="stepper" data-stepper><button type="button" data-d="-1" aria-label="Méně"><svg class="ico"><use href="#i-minus"/></svg></button><input type="number" data-f="n" value="'+r.n+'" min="1" max="200" inputmode="numeric"><button type="button" data-d="1" aria-label="Více"><svg class="ico"><use href="#i-plus"/></svg></button></span></label></div></div>'
   +(st.rows.length>1?'<button type="button" class="wdel" aria-label="Odebrat"><svg class="ico"><use href="#i-x"/></svg></button>':'')+'</div>';
}
function rowsRender(){$('#wrows').innerHTML=st.rows.map(rowHTML).join('');totals();}
function totals(){var ks=0,m2=0;st.rows.forEach(function(r){var n=+r.n||0;ks+=n;m2+=n*(+r.w||0)*(+r.h||0)/1e6;});
  $('#wtotal').innerHTML='<span>Celkem: <b>'+ks+' ks</b></span><span>Plocha: <b>'+m2.toFixed(2).replace('.',',')+' m²</b></span>';
  sumRender();}
$('#wrows').addEventListener('input',function(e){var inp=e.target.closest('input');if(!inp)return;var row=e.target.closest('.wrow'),i=+row.dataset.i,f=inp.dataset.f;st.rows[i][f]=inp.value;
  if(f!=='n'){var r=st.rows[i];$('.wrow-prev',row).innerHTML=lineWin(r.t,r.w,r.h)+'<span class="wrow-dim">'+(r.w||'?')+' × '+(r.h||'?')+'</span>';inp.parentNode.classList.remove('err');}
  totals();});
$('#wrows').addEventListener('click',function(e){var row=e.target.closest('.wrow');if(!row)return;var i=+row.dataset.i;
  var tb=e.target.closest('.wtypes button'); if(tb){var t=tb.dataset.t, r=st.rows[i]; var wasDef=TDEF[r.t]&&+r.w===TDEF[r.t][0]&&+r.h===TDEF[r.t][1]; r.t=t; if(wasDef){r.w=TDEF[t][0];r.h=TDEF[t][1];} row.outerHTML=rowHTML(r,i); totals(); return;}
  if(e.target.closest('.wdel')){st.rows.splice(i,1);rowsRender();}});
$('#wadd').addEventListener('click',function(){st.rows.push({t:'1',w:800,h:1200,n:1});rowsRender();var rs=$$('#wrows .wrow');var last=rs[rs.length-1];if(last)$('input[data-f=w]',last).focus();});
$('#noDim').addEventListener('change',function(){st.noDim=this.checked;$('#dimWrap').style.display=st.noDim?'none':'';$('#noDimKs').style.display=st.noDim?'':'none';hideErr();sumRender();});
$('#noDimN').addEventListener('input',sumRender);
document.addEventListener('click',function(e){var b=e.target.closest('[data-stepper] button');if(!b)return;var inp=$('input',b.parentNode),v=(+inp.value||0)+(+b.dataset.d);v=Math.max(+inp.min||1,Math.min(+inp.max||999,v));inp.value=v;inp.dispatchEvent(new Event('input',{bubbles:true}));});

var drop=$('#drop'), fin=$('#files');
function addFiles(list){Array.prototype.slice.call(list).forEach(function(f){if(!/^image\//.test(f.type)||st.files.length>=8)return;st.files.push({f:f,url:URL.createObjectURL(f)});});thumbs();}
function thumbs(){$('#thumbs').innerHTML=st.files.map(function(x,i){return '<figure style="background-image:url('+x.url+')"><button type="button" data-rm="'+i+'" aria-label="Odebrat"><svg class="ico"><use href="#i-x"/></svg></button></figure>';}).join('');sumRender();}
fin.addEventListener('change',function(){addFiles(fin.files);fin.value='';});
['dragenter','dragover'].forEach(function(ev){drop.addEventListener(ev,function(e){e.preventDefault();drop.classList.add('over');});});
['dragleave','drop'].forEach(function(ev){drop.addEventListener(ev,function(e){e.preventDefault();drop.classList.remove('over');});});
drop.addEventListener('drop',function(e){addFiles(e.dataTransfer.files);});
$('#thumbs').addEventListener('click',function(e){var b=e.target.closest('[data-rm]');if(!b)return;st.files.splice(+b.dataset.rm,1);thumbs();});

function val(n){var e=$('input[name="'+n+'"]:checked');return e?e.value:'';}
var OBJ={rd:'Rodinný dům',byt:'Byt',svj:'Panelový dům / SVJ',komer:'Firma / jiná budova'};
function sumRender(){
  var prods=Object.keys(st.products).filter(function(k){return st.products[k];}).map(function(k){return PNAME[k];});
  var ks=0,m2=0; st.rows.forEach(function(r){var n=+r.n||0;ks+=n;m2+=n*(+r.w||0)*(+r.h||0)/1e6;});
  var cnt=st.noDim?'cca '+($('#noDimN').value||'?')+' ks':ks+' ks · '+m2.toFixed(2).replace('.',',')+' m²';
  var svc=$$('input[name=svc]:checked').map(function(i){return i.value;});
  var pr=val('profil'), sk=val('sklo');
  var place=[($('#ob').value||'').trim(),selKraj?krajName(selKraj):''].filter(Boolean).join(', ');
  var rows=[['Produkty',prods.join(', ')],['Stavba',OBJ[val('obj')]||''],['Počet',cnt],['Profil',pr==='?'?'Nevím':pr+'komorový'],
    ['Zasklení',sk==='3'?'Trojsklo Ug 0,7 <span class="tag">Akce</span>':'Dvojsklo'],['Barva',val('barva')],['Také',svc.join(', ')],['Místo',place],['Fotky',st.files.length?st.files.length+' ks':'']];
  $('#sumRows').innerHTML=rows.map(function(r){return '<div class="sum-row"><span>'+r[0]+'</span><b class="'+(r[1]?'':'empty')+'">'+(r[1]||'—')+'</b></div>';}).join('');
  $('#sumMobTxt').textContent=prods.length?(prods.length===1?prods[0]:prods.length+' produkty')+' · '+(st.noDim?'cca '+$('#noDimN').value+' ks':ks+' ks'):'Zobrazit';
}
$$('#wiz input, #wiz select, #wiz textarea').forEach(function(el){el.addEventListener('change',sumRender);});
$('#ob').addEventListener('input',sumRender);
$('#kraj').addEventListener('change',function(){selectKraj(this.value);});
$('#sumMob').addEventListener('click',function(){$('#sumCard').classList.toggle('open');});

var steps=$$('.wstep'), sbtn=$$('#wizSteps button');
function showErr(t){$('#errTxt').textContent=t;$('#errBox').classList.add('on');}
function hideErr(){$('#errBox').classList.remove('on');}
function go(n,noScroll){
  var back=n<st.step; st.step=n; hideErr();
  steps.forEach(function(s,i){s.classList.toggle('on',i===n);s.classList.toggle('back',i===n&&back);});
  sbtn.forEach(function(b,i){b.classList.toggle('on',i===n);b.classList.toggle('done',i<n);});
  $('#wBack').hidden=n===0;
  $('#wNext').innerHTML=n===3?'Odeslat poptávku<svg class="ico ico-arrow"><use href="#i-arrow"/></svg>':'Pokračovat<svg class="ico ico-arrow"><use href="#i-arrow"/></svg>';
  $('#sumStep').textContent='Krok '+(n+1)+'/4';
  if(noScroll)return;
  var w=$('#wiz').getBoundingClientRect(); if(w.top<0||w.top>window.innerHeight*.5) window.scrollTo({top:window.scrollY+w.top-90,behavior:REDUCED?'auto':'smooth'});
}
function fErr(id,bad){$(id).classList.toggle('err',bad);return bad;}
function validate(n){
  if(n===0&&!Object.keys(st.products).some(function(k){return st.products[k];})){showErr('Vyberte prosím alespoň jednu položku, kterou poptáváte.');return false;}
  if(n===1&&!st.noDim){var bad=false;
    $$('#wrows .wrow').forEach(function(row,i){var r=st.rows[i];
      var bw=!(+r.w>=300&&+r.w<=6000), bh=!(+r.h>=300&&+r.h<=4000);
      $('input[data-f=w]',row).parentNode.classList.toggle('err',bw);$('input[data-f=h]',row).parentNode.classList.toggle('err',bh);
      if(bw||bh||!(+r.n>=1))bad=true;});
    if(bad){showErr('Zkontrolujte rozměry – šířka 300–6000 mm, výška 300–4000 mm. Pokud rozměry neznáte, zaškrtněte políčko níže.');return false;}}
  if(n===3){var e=false, tel=($('#tel').value||'').replace(/\D/g,'');
    e=fErr('#fJm',!$('#jm').value.trim())||e;
    e=fErr('#fTel',tel.length<9)||e;
    e=fErr('#fOb',!$('#ob').value.trim())||e;
    var em=$('#em').value.trim(); e=fErr('#fEm',!!em&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))||e;
    var g=!$('#gdpr').checked; $('#fGdpr').classList.toggle('err',g); e=g||e;
    if(e){showErr('Doplňte prosím označené údaje.');var f=$('#wiz .f.err input, #wiz .f.err select');if(f)f.focus();return false;}}
  return true;
}
$('#wNext').addEventListener('click',function(){if(!validate(st.step))return; if(st.step<3)go(st.step+1); else submit();});
$('#wBack').addEventListener('click',function(){if(st.step>0)go(st.step-1);});
sbtn.forEach(function(b,i){b.addEventListener('click',function(){if(i<st.step)go(i);});});
$$('#wiz .f input').forEach(function(i){i.addEventListener('input',function(){i.closest('.f').classList.remove('err');});});
$('#gdpr').addEventListener('change',function(){$('#fGdpr').classList.remove('err');});
function submit(){
  var data={produkty:Object.keys(st.products).filter(function(k){return st.products[k];}),stavba:val('obj'),jde_o:val('akt'),okna:st.noDim?{pocet:$('#noDimN').value}:st.rows,profil:val('profil'),sklo:val('sklo'),barva:val('barva'),
    take:$$('input[name=svc]:checked').map(function(i){return i.value;}),jmeno:$('#jm').value,telefon:$('#tel').value,email:$('#em').value,misto:$('#ob').value,kraj:krajName(selKraj),kdy:$('#kdy').value,kontakt:val('kontakt'),poznamka:$('#pozn').value,fotky:st.files.length};
  if(window.console)console.log('Poptávka (demo):',data);
  $('.wiz-body').style.display='none';$('#wizNav').style.display='none';$('#wizSteps').style.display='none';
  var viaMail=val('kontakt')==='mail'&&$('#em').value.trim();
  $('#doneTxt').textContent='Cenovou nabídku vám vypracujeme zdarma a nezávazně. Ozveme se vám '+(viaMail?'e-mailem na '+$('#em').value.trim():'telefonicky na čísle '+$('#tel').value.trim())+'.';
  $('#wizDone').classList.add('on'); $('#sumStep').textContent='Odesláno';
  var w=$('#wiz').getBoundingClientRect(); window.scrollTo({top:window.scrollY+w.top-90,behavior:REDUCED?'auto':'smooth'});
}
$('#again').addEventListener('click',function(){$('#wizDone').classList.remove('on');$('.wiz-body').style.display='';$('#wizNav').style.display='';$('#wizSteps').style.display='';go(0);});

/* ---------- CTA odkazy → formulář ---------- */
document.addEventListener('click',function(e){var a=e.target.closest('[data-go="calc"]');if(!a)return;
  if(a.dataset.prod){setProd(a.dataset.prod,true);}
  if(a.dataset.obj){var r=$('input[name=obj][value="'+a.dataset.obj+'"]');if(r)r.checked=true;}
  if(a.id==='mpBtn'&&selKraj){$('#kraj').value=selKraj;}
  sumRender();
  if(st.step!==0&&a.dataset.prod&&!$('#wizDone').classList.contains('on'))go(0,true);
});
$('#quickForm').addEventListener('submit',function(e){e.preventDefault();
  var k=$('#qProd').value, n=Math.max(1,+$('#qKs').value||1), tel=$('#qTel').value.trim();
  Object.keys(st.products).forEach(function(x){setProd(x,false);}); setProd(k,true);
  if(['pvc','alu','euro','balkon'].indexOf(k)>=0){st.rows=[{t:k==='balkon'?'balkon':'2',w:k==='balkon'?800:1200,h:k==='balkon'?2200:1400,n:n}];st.noDim=false;$('#noDim').checked=false;$('#dimWrap').style.display='';$('#noDimKs').style.display='none';rowsRender();}
  else{st.noDim=true;$('#noDim').checked=true;$('#noDimN').value=n;$('#dimWrap').style.display='none';$('#noDimKs').style.display='';}
  if(tel)$('#tel').value=tel;
  sumRender(); go(1,true);
  var top=$('#kalkulace').getBoundingClientRect().top+window.scrollY-80; window.scrollTo({top:top,behavior:REDUCED?'auto':'smooth'});
});

/* ---------- Hero slider ---------- */
(function(){
  var slides=$$('#heroSlider .hs'), caps=$$('.hcap'), dots=$$('#hsDots button'), dotsBox=$('#hsDots');
  if(slides.length<2)return;
  var i=0, DUR=6500, t=null, paused=false, stopped=REDUCED;
  dotsBox.style.setProperty('--hs-dur',DUR+'ms');
  function show(n){
    i=(n+slides.length)%slides.length;
    slides.forEach(function(s,k){s.classList.toggle('on',k===i);});
    caps.forEach(function(c,k){c.classList.toggle('on',k===i);});
    dots.forEach(function(d,k){d.classList.remove('on');d.classList.toggle('done',k<i);void d.offsetWidth;});
    dots[i].classList.add('on');
    schedule();
  }
  function schedule(){clearTimeout(t); if(stopped||paused)return; t=setTimeout(function(){show(i+1);},DUR);}
  function stop(){stopped=true;clearTimeout(t);dotsBox.classList.add('stopped');}
  if(stopped)dotsBox.classList.add('stopped');
  $('#hsPrev').addEventListener('click',function(){stop();show(i-1);});
  $('#hsNext').addEventListener('click',function(){stop();show(i+1);});
  dots.forEach(function(d,k){d.addEventListener('click',function(){stop();show(k);});});
  var art=$('#heroArt');
  art.addEventListener('mouseenter',function(){paused=true;clearTimeout(t);dotsBox.classList.add('paused');});
  art.addEventListener('mouseleave',function(){paused=false;dotsBox.classList.remove('paused');if(!stopped){show(i);}});
  var x0=null; art.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  art.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40){stop();show(i+(dx<0?1:-1));}x0=null;},{passive:true});
  document.addEventListener('visibilitychange',function(){if(document.hidden){clearTimeout(t);}else{schedule();}});
  schedule();
})();

setProd('pvc',true);
rowsRender(); sumRender();
})();
