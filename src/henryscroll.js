const paragraphs = [
  {id: "A", text: "Welcome Adventurer! In this world, some experiences will rewrite the past! When you think you've seen it all, try scrolling up or down to see how things may have changed.", visible: true},
  {id: "D", text: "Before you there is a door.", visible: true},
  {id: "B", text: "You recall that you had a key in your pocket all along. You unlock the door and step through into a long hallway.", visible: false, subtracts: ["C", "K"], adds: ["F"]},
  {id: "E", text: "But the door is locked!", visible: true},
  {id: "G", text: "Instead you crawl into a vent.", visible: true},
  {id: "H", text: "At the end you find a room.", visible: true},
  {id: "I", text: "The room is strange", visible: true},
  {id: "J", text: "Very very very strange indeed", visible: true},
  {id: "K", text: "Perhaps the strangest room you have seen", visible: true},
  {id: "C", text: "But at its center, there is a key on a pedestal. Wait a minute, you remember this key.", visible: true, adds: ["B"], subtracts: ["E", "G"]},
  {id: "F", text: "You have found the way through! Congratulations adventurer.", visible: false}
]

function init() {
  // console.log(wh);
  const body = document.getElementById("main");
  const offset = 100;
  const wh = window.innerHeight - offset;

  paragraphs.forEach((p, i) => {
    addParagraph(p);
  })

  document.addEventListener('scroll', e => {
     const lastKnownScrollPosition = window.scrollY;
     paragraphs.forEach((p, i) => {
       if(!p.visible) return;
       const tag = document.getElementById(p.id);
       p.rect = tag.getBoundingClientRect();
       if (p.rect.top <= wh && p.rect.top >=-wh) {
         if (p.adds) {
           p.adds.forEach(pa => {
             const targets = paragraphs.filter(po => po.id==pa);
             targets.forEach(target => {
               target.visible = true;
               if(!document.getElementById(target.id)) {
                 const after = document.getElementById(paragraphs[paragraphs.indexOf(target)-1].id)
                 console.log(after)
                 addParagraph(target, after);
               }
             })
          })
         }
         if (p.subtracts) {
           p.subtracts.forEach(ps => {
             const targets = paragraphs.filter(po => po.id==ps);
             targets.forEach(target => {
               target.visible = false;
               if (document.getElementById(target.id)) removeParagraph(target);
             })
           })
         }
       }
       // console.log(p.text, p.rect.top, p.rect.right, p.rect.bottom, p.rect.left);
     })
  })
}

function addParagraph(p,after=null) {
  if (!p.visible) return;
  const tag = document.createElement("p");
  tag.setAttribute('id', p.id)
  const text = document.createTextNode(p.text);
  tag.appendChild(text);
  const body = document.getElementById("main");
  if (!after) {
    body.appendChild(tag);
  } else {
    insertAfter(tag, after);
  }
  p.rect = tag.getBoundingClientRect();
}

function removeParagraph(p) {
  const tag = document.getElementById(p.id);
  if (tag) {
    const body = document.getElementById("main");
    body.removeChild(tag);
  }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
