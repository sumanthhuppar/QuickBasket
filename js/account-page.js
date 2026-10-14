
document.addEventListener('DOMContentLoaded',()=>{
 const user=JSON.parse(localStorage.qb_user||'null');
 const initials=u=>u?((u.firstName||'Q').charAt(0)+(u.lastName||'B').charAt(0)).toUpperCase():'QB';
 const full=u=>u?`${u.firstName||''} ${u.lastName||''}`.trim():'Welcome to QuickBasket';
 ['side-avatar','main-avatar'].forEach(id=>document.getElementById(id).textContent=initials(user));
 document.getElementById('side-name').textContent=user?full(user):'Welcome to QuickBasket';
 document.getElementById('side-email').textContent=user?(user.email||'Add your email'):'Sign in to manage your account';
 document.getElementById('welcome-name').textContent=user?`Good to see you, ${user.firstName||'there'}`:'Your basket, your way.';
 document.getElementById('member-copy').textContent=user?'Your profile is ready. Keep your details and delivery preferences up to date.':'Create a profile for faster checkout, saved addresses and a more personal shopping experience.';
 document.getElementById('profile-status').textContent=user?'Active':'Guest';
 document.getElementById('profile-status-note').textContent=user?'Known user profile':'Profile not completed';
 document.getElementById('profile-cta').textContent=user?'Shop groceries':'Complete profile';
 document.getElementById('profile-cta').href=user?'products.html':'register.html';
 const form=document.getElementById('profile-form');
 ['firstName','lastName','email','phone'].forEach(k=>{const e=document.getElementById(k);e.value=user?.[k]||'';});
 const edit=document.getElementById('edit-profile'),actions=document.getElementById('profile-actions');
 edit.addEventListener('click',()=>{form.querySelectorAll('input').forEach(x=>x.disabled=false);actions.style.display='flex';edit.style.display='none';});
 document.getElementById('cancel-edit').addEventListener('click',()=>location.reload());
 form.addEventListener('submit',e=>{e.preventDefault();if(!user){location.href='register.html';return}const updated={...user};['firstName','lastName','email','phone'].forEach(k=>updated[k]=document.getElementById(k).value);localStorage.qb_user=JSON.stringify(updated);toast('Profile details saved');setTimeout(()=>location.reload(),600)});
 document.getElementById('logout').addEventListener('click',()=>{localStorage.removeItem('qb_user');location.href='index.html'});
 let address=localStorage.qb_address||'';const renderAddress=()=>{const box=document.getElementById('address-display');document.getElementById('address-count').textContent=address?'1 saved':'0 saved';box.innerHTML=address?`<div class="address-icon">⌖</div><div><b>Home address</b><p>${address.replace(/[<>]/g,'')}</p><small>DEFAULT DELIVERY ADDRESS</small></div>`:`<div class="address-icon">⌖</div><div><b>No saved address yet</b><p>Add a delivery address during checkout and keep it handy for your next order.</p><a class="text-action" href="checkout.html">Add address at checkout →</a></div>`};renderAddress();
 document.getElementById('add-address').addEventListener('click',()=>{document.getElementById('address-form').style.display='block';document.getElementById('saved-address').value=address});
 document.getElementById('cancel-address').addEventListener('click',()=>document.getElementById('address-form').style.display='none');
 document.getElementById('address-form').addEventListener('submit',e=>{e.preventDefault();address=document.getElementById('saved-address').value.trim();localStorage.qb_address=address;renderAddress();document.getElementById('address-form').style.display='none';toast('Delivery address saved')});
 const order=JSON.parse(localStorage.qb_order||'null');const orderBox=document.getElementById('recent-order');
 if(order){document.getElementById('order-count').textContent='1';orderBox.innerHTML=`<div class="order-row"><div><div class="order-id">${order.id||order.orderId||'Recent order'}</div><small>Most recent grocery order · ₹${order.total||0}</small></div><span class="order-status">${order.status||'PLACED'}</span><a class="text-action" href="track-order.html">Track →</a></div>`}
 const c=JSON.parse(localStorage.qb_consent||'{}');[['analytics','analytics-pref'],['personalization','personalization-pref'],['marketing','marketing-pref']].forEach(([k,id])=>document.getElementById(id).checked=!!c[k]);
 const persist=(vals)=>{let old=JSON.parse(localStorage.qb_consent||'{}');Object.assign(old,vals,{updatedAt:new Date().toISOString()});localStorage.qb_consent=JSON.stringify(old);localStorage.qb_consent_decided='true';document.getElementById('consent-status').textContent='Your privacy preferences have been saved.';document.dispatchEvent(new CustomEvent('qb:consentchange',{detail:old}));};
 document.getElementById('save-account-consent').addEventListener('click',()=>persist({analytics:document.getElementById('analytics-pref').checked,personalization:document.getElementById('personalization-pref').checked,marketing:document.getElementById('marketing-pref').checked}));
 document.getElementById('account-optout').addEventListener('click',()=>{['analytics-pref','personalization-pref','marketing-pref'].forEach(id=>document.getElementById(id).checked=false);persist({analytics:false,personalization:false,marketing:false});toast('Optional tracking opted out')});
});
