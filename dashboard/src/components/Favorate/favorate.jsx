// // if you had select favorate
// function Favorate(props) {
//   let dislike = (e) => {
//     let owner = e.target.nextElementSibling.children[0].innerHTML;
//     let myFavorate = {
//       "UserName": props.name,
//       "Owner": owner
//     };

//     fetch('/myfavorate/' + props.name ,{
//       method: 'delete',
//       dataType: 'json',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(myFavorate)
//     })
//     .then(res => res.json())
//     .then(data => {
//       let result = `${data.map(p => `
//           <div>
//             <button class="dislike">DisLike</button>
//             <div>UserName: <span>${p.OwnerName}</span></div>
//             <div>Owner Gender: <span>${p.Gender}</span></div>
//             <div>Address: <span>${p.Address}</span></div>
//             <div>Price: <span>${p.Price}</span></div>
//             <div>Type: <span>${p.Type}</span></div>
//             <div>Rooms Available: <span>${p.Availability}</span></div>
//             <div>Pet allowed: <span>${p.Pet}</span></div>
//             <div>Smoke allowed: <span>${p.Smoke}</span></div>
//             <div>Gender accepted: <span>${p.GenderAccept}</span></div>
//             <img src=${p.img} height="500" width="500"/>
//           </div>`)}`;
//       document.getElementsByClassName("myfavorate")[0].innerHTML = result;
//       document.getElementsByClassName("myfavorate")[0].style.display = "flex";
//       document.getElementsByClassName("myfavorate")[0].style.flexWrap = "wrap";
//       let dislikebutton = document.getElementsByClassName("dislike");
//       Array.prototype.map.call(dislikebutton, p=>p.addEventListener("click", dislike));
//     });
//   };
//   return (
//     <div class="myfavorate"></div>
//   );
// };