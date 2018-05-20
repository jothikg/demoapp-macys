let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

let products = [
  {
    id:getId(),
    name: 'Baby Frock Design',
    image: '../assets/baby_frock_design.jpg'
  },
  {
    id:getId(),
    name: 'Coral Girls Party Dress',
    image: '../assets/coral_gilrs_party.jpg'
  },
  {
    id:getId(),
    name: 'Coral Organza Ruffle Ball Gown',
    image: '../assets/coral_organza_ruffle_ball_gown.jpg'
  },
  {
    id:getId(),
    name: 'Floral Lace Dress',
    image: '../assets/floral_lace_dress.jpg'
  },
  {
    id:getId(),
    name: 'Little Pony Princess',
    image: '../assets/little_pony_princess.jpg'
  },
  {
    id:getId(),
    name: 'Mint Baby Girl',
    image: '../assets/mint_baby_girl.jpg'
  }
];

let anOrder = {
  product: '',
  size: '',
  color: '',
  quantity: '',
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: ''
}

export class MockAPI {

  getProductList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = products.map(x =>  { return {
          id:x.id,
          name:x.name,
          image_path:x.image
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getProductDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = products.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveOrder(order){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        Object.assign(anOrder, order);
        this.isRequesting = false;
        resolve(anOrder);
      }, latency);
    });
  }

  getOrder(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(anOrder);
        this.isRequesting = false;
      }, latency);
    });
  }
}

MockAPI.prototype.isRequesting = false;
