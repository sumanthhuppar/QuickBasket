const QB_PRODUCTS={
milk:{id:'P001',name:'Fresh Farm Milk 500ml',cat:'Dairy',emoji:'🥛',price:32,old:38,sku:'QB-MILK-500'},
banana:{id:'P002',name:'Robusta Bananas - 6 pcs',cat:'Fruits',emoji:'🍌',price:45,old:55,sku:'QB-BAN-006'},
bread:{id:'P003',name:'Classic White Bread',cat:'Bakery',emoji:'🍞',price:42,old:48,sku:'QB-BRD-001'},
eggs:{id:'P004',name:'Farm Fresh Eggs - 6',cat:'Dairy',emoji:'🥚',price:58,old:65,sku:'QB-EGG-006'},
tomato:{id:'P005',name:'Fresh Tomatoes 1kg',cat:'Vegetables',emoji:'🍅',price:52,old:65,sku:'QB-TOM-001'},
potato:{id:'P006',name:'Fresh Potatoes 1kg',cat:'Vegetables',emoji:'🥔',price:38,old:45,sku:'QB-POT-001'},
chips:{id:'P007',name:'Classic Salted Chips',cat:'Snacks',emoji:'🍟',price:30,old:35,sku:'QB-CHP-001'},
cola:{id:'P008',name:'Sparkling Cola 750ml',cat:'Beverages',emoji:'🥤',price:45,old:50,sku:'QB-COL-750'},
coffee:{id:'P009',name:'Premium Instant Coffee 100g',cat:'Beverages',emoji:'☕',price:149,old:175,sku:'QB-COF-100'},
paneer:{id:'P010',name:'Fresh Paneer 200g',cat:'Dairy',emoji:'🧀',price:89,old:105,sku:'QB-PAN-200'},
detergent:{id:'P011',name:'Power Wash Detergent 1kg',cat:'Home Care',emoji:'🧴',price:119,old:139,sku:'QB-DET-001'},
biscuits:{id:'P012',name:'Butter Cookies 200g',cat:'Snacks',emoji:'🍪',price:65,old:75,sku:'QB-BIS-200'}};
document.addEventListener('DOMContentLoaded',()=>{
 const params=new URLSearchParams(location.search);const id=params.get('productId');const slug=params.get('productName');
 const product=QB_PRODUCTS[slug]||Object.values(QB_PRODUCTS).find(p=>p.id===id)||QB_PRODUCTS.milk;
 document.title=product.name+' | QuickBasket';
 const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
 set('p-name',product.name);set('crumb-name',product.name);set('p-category',product.cat.toUpperCase());set('p-emoji',product.emoji);set('p-price','₹'+product.price);set('p-old','₹'+product.old);set('p-id',product.id);set('p-sku',product.sku);set('p-cat2',product.cat);set('button-price','₹'+product.price);
 set('p-discount','SAVE '+Math.round((product.old-product.price)/product.old*100)+'%');
 let quantity=1;const q=()=>{set('qty-value',quantity);set('button-price','₹'+product.price*quantity)};
 document.getElementById('qty-minus').onclick=()=>{quantity=Math.max(1,quantity-1);q()};
 document.getElementById('qty-plus').onclick=()=>{quantity=Math.min(99,quantity+1);q()};
 document.getElementById('add-product').onclick=()=>add(productKey(product),quantity);
 function productKey(p){return Object.keys(QB_PRODUCTS).find(k=>QB_PRODUCTS[k].id===p.id)}
 const related=Object.entries(QB_PRODUCTS).filter(([k,p])=>p.id!==product.id && (p.cat===product.cat || ['milk','banana','eggs','paneer'].includes(k))).slice(0,4);
 document.getElementById('related-grid').innerHTML=related.map(([k,p])=>`<article class="card product" data-product-card data-product-id="${p.id}"><div class="pic">${p.emoji}</div><div class="body"><span class="tag">${p.cat}</span><h3>${p.name}</h3><small>Product ID: ${p.id}</small><p><span class="price">₹${p.price}</span> <del class="old">₹${p.old}</del></p><div class="actions"><a class="btn outline" data-product-link data-product-id="${p.id}" href="product.html?productId=${p.id}&productName=${k}">View details</a><button class="btn primary" data-add-product="${k}" data-product-id="${p.id}" onclick="add('${k}')">Add</button></div></div></article>`).join('');
});