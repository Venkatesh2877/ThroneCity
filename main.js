import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { camera, light, amblight } from "./cameraSceneLight.js";
import { floorPlane, roofPlane } from "./floor.js";
import {
  CharacterControls,
  loading,
  changeLoading,
  userType,
  updateUserType,
  inputing,
  updateInputing,
  updateMovement,
} from "./characterControls.js";
import { handleFormSubmission } from "./functions.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { degToRad } from "three/src/math/MathUtils.js";

//registration page
const question = document.querySelector(".displayQuestions");

const micOn = document.querySelector(".micOn");
const micOff = document.querySelector(".micOff");
const inputContainer = document.querySelector(".inputContainerRes");
const inputBox = document.querySelector(".inputBox");
const detailForm = document.querySelector(".detailForm");
const welcome = document.querySelector(".welcome");

const details = document.querySelector(".details");
const detailsPdf = document.querySelector(".detailsPdf");
const eclipse = document.querySelector(".eclipse");
const wave = document.querySelector(".wave");
export const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// Scene
export const scene = new THREE.Scene();
scene.add(camera);
scene.add(light);
scene.add(amblight);

LoadModel();
RAF();

// world
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  "src/res/Daylight Box_Right.bmp",
  "src/res/Daylight Box_Left.bmp",
  "src/res/Daylight Box_Top.bmp",
  "src/res/Daylight Box_Bottom.bmp",
  "src/res/Daylight Box_Front.bmp",
  "src/res/Daylight Box_Back.bmp",
]);
scene.background = texture;

//floor and roof Load using image texture
scene.add(floorPlane);
scene.add(roofPlane);

// CONTROLS
var orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.minDistance = 135;
orbitControls.maxDistance = 165;
orbitControls.enablePan = false;
orbitControls.maxPolarAngle = Math.PI / 3 + 0.2;

// Add event listener to the parent element using event delegation
document.querySelector(".input").addEventListener("submit", function (event) {
  if (event.target && event.target.tagName.toLowerCase() === "form") {
    // Only handle events on the 'form' element
    handleFormSubmission(event);
  }
});

var userTypeElements = document.querySelectorAll(".userTypes .type");

// Add click listener to each element
userTypeElements.forEach(function (element) {
  element.addEventListener("click", function () {
    // Display the clicked element's value
    var clickedValue = this.textContent; // or this.innerText
    updateUserType(clickedValue);
    updateInputing(true);
    document.querySelector(".userTypes").style.display = "none";
  });
});

var characterControl;

function LoadModel() {
  const loader = new GLTFLoader();
  const fbxLoader = new FBXLoader();

  //load surroundings
  loader.load(
    "src/modern_city_block (1).glb",
    (gltf) => {
      gltf.scene.traverse((c) => {
        c.castShadow = true;
      });
      gltf.scene.position.set(0, 23, 0);
      scene.add(gltf.scene);
    },
    function (xhr) {
      document.querySelector("span").innerHTML =
        (xhr.loaded / xhr.total) * 100 < 10
          ? String((xhr.loaded / xhr.total) * 100).slice(0, 1)
          : (xhr.loaded / xhr.total) * 100 < 100
          ? String((xhr.loaded / xhr.total) * 100).slice(0, 2)
          : "100";
      if ((xhr.loaded / xhr.total) * 100 == 100) {
        setTimeout(show, 3000);
        function show() {
          document.querySelector(".loading").style.display = "none";
          canvas.style.display = "block";
          changeLoading(false);
        }
      }
    }
  );

  //load main building
  loader.load(
    "src/low_rise_wall_to_wall_office_building.glb",
    (gltf) => {
      gltf.scene.traverse((c) => {
        c.castShadow = true;
      });
      gltf.scene.position.set(3300, -112, 10500);
      gltf.scene.scale.set(0.6, 0.6, 0.6);
      scene.add(gltf.scene);

      //add font
      const fontLoader = new FontLoader();
      fontLoader.load(
        "node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json",
        (droidFont) => {
          const textGeometry = new TextGeometry("ThronePlus", {
            height: 2,
            size: 50,
            font: droidFont,
          });
          const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00cccc });
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.set(3230, 90, 11580);
          scene.add(textMesh);
        }
      );

      // Image
      const textureLoader = new THREE.TextureLoader();
      // const imageTexture = textureLoader.load("./src/res/rakdao_jpeg.jpeg"); // Set the path to your image
      const imageTexture = textureLoader.load("./src/res/throne.png"); // Set the path to your image
      const imageMaterial = new THREE.MeshBasicMaterial({
        map: imageTexture,
        transparent: true,
      });
      const imageGeometry = new THREE.PlaneGeometry(110, 110); // Adjust the size as needed
      const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
      imageMesh.position.set(3150, 100, 11500); // Adjust the position as needed

      scene.add(imageMesh);
    },
    function (xhr) {
      document.querySelector("span").innerHTML =
        (xhr.loaded / xhr.total) * 100 < 10
          ? String((xhr.loaded / xhr.total) * 100).slice(0, 1)
          : (xhr.loaded / xhr.total) * 100 < 100
          ? String((xhr.loaded / xhr.total) * 100).slice(0, 2)
          : "100";
      if ((xhr.loaded / xhr.total) * 100 == 100) {
        setTimeout(show, 3000);
        function show() {
          document.querySelector(".loading").style.display = "none";
          canvas.style.display = "block";
          changeLoading(false);
        }
      }
    }
  );

  //another user model
  fbxLoader.load("./src/character.fbx", (fbx) => {
    const model = fbx;
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
      }
    });

    model.position.set(3400, -112, 12600);
    // model.position.set(3400, -112, 10400);
    model.scale.set(0.4, 0.4, 0.4);
    model.rotation.y = THREE.MathUtils.degToRad(-180);

    var animationmap = new Map();
    var mixer = new THREE.AnimationMixer(model);

    const anim = new FBXLoader();
    fbxLoader.load("./src/Breathing Idle.fbx", (anim) => {
      animationmap.set("Idle", mixer.clipAction(anim.animations[0]));
      mixer.clipAction(anim.animations[0]).play();
      mixer.update(clock.getDelta());
    });

    // Load walk animation
    fbxLoader.load("./src/Walking.fbx", (walk) => {
      animationmap.set("Walk", mixer.clipAction(walk.animations[0]));
    });

    scene.add(model);
    characterControl = new CharacterControls(
      model,
      mixer,
      animationmap,
      orbitControls,
      camera,
      "Idle"
    );
  });

  //load reception model
  loader.load("./src/reception.glb", (gltf) => {
    const model = gltf.scene;
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
      }
      model.position.set(4200, -112, 10620);
      model.scale.set(30, 30, 30);
      model.rotation.y = THREE.MathUtils.degToRad(-90);
      model.name = "reception";
      scene.add(model);

      const fontLoader = new FontLoader();
      fontLoader.load(
        "node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json",
        (droidFont) => {
          const textGeometry = new TextGeometry("Register here", {
            height: 2,
            size: 15,
            font: droidFont,
          });
          const textMaterial = new THREE.MeshBasicMaterial({ color: 0xf2f2f2 });
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.set(4200, -40, 10560);
          textMesh.rotation.y = THREE.MathUtils.degToRad(-90);
          textMesh.name = "receptionText";
          // textMesh.position.x=350;
          // textMesh.position.z=-120;
          scene.add(textMesh);
        }
      );

      //image
      const textureLoader = new THREE.TextureLoader();
      // const imageTexture = textureLoader.load("./src/res/rakdao_jpeg.jpeg"); // Set the path to your image
      const imageTexture = textureLoader.load("./src/res/throne.png"); // Set the path to your image
      const imageMaterial = new THREE.MeshBasicMaterial({
        map: imageTexture,
        transparent: true,
      });
      const imageGeometry = new THREE.PlaneGeometry(60, 60); // Adjust the size as needed
      const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
      imageMesh.position.set(4200, 10, 10620); // Adjust the position as needed
      imageMesh.rotation.y = THREE.MathUtils.degToRad(-90);


      scene.add(imageMesh);
    });

    var repGltfanimations = gltf.animations; // getting all gltf animation clips from gltf model
    var repMixer = new THREE.AnimationMixer(model); // will convert all animation clips into animation actions using mixer which helps into fading in or fading out animations for smooth animations transition
    var repAnimationClip = repGltfanimations[0];

    // Create an animation action
    var repAnimationAction = repMixer.clipAction(repAnimationClip);

    // Play the animation
    repAnimationAction.play();
    repMixer.update(clock.getDelta());
  });

  //load trash model
  loader.load("./src/trash_bin.glb", (gltf) => {
    const model = gltf.scene;
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
      }
      model.position.set(4200, -112, 10520);
      model.scale.set(30, 30, 30);
      scene.add(model);
    });
  });

  //load sofa model
  loader.load("./src/modern__sofa.glb", (gltf) => {
    const model = gltf.scene;
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
      }
    });

    for (let i = 0; i < 4; i++) {
      const clonedModel = gltf.scene.clone();
      clonedModel.position.set(4150 - i * 550, -85, 11040);
      if (i % 2 != 0) {
        clonedModel.rotation.y = THREE.MathUtils.degToRad(90);
      } else {
        clonedModel.rotation.y = THREE.MathUtils.degToRad(-90);
      }
      clonedModel.scale.set(75, 75, 75);
      scene.add(clonedModel);
    }
  });

  //load cubicle model
  loader.load("./src/office_desk.glb", (gltf) => {
    const model = gltf.scene;
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
      }
    });

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        const clonedModel = gltf.scene.clone();
        clonedModel.position.set(3550 + j * 200, -112, 10740 - i * 200);
        clonedModel.rotation.y = THREE.MathUtils.degToRad(180);
        scene.add(clonedModel);
      }
    }
  });

  //load printer
  loader.load("./src/printer.glb", (gltf) => {
    const model = gltf.scene;
    model.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
      }
    });

    model.position.set(2400, -112, 10500);
    model.scale.set(2000, 2000, 2000);
    model.rotation.y = THREE.MathUtils.degToRad(90);
    scene.add(model);
  });

  //load plant model
  loader.load("./src/free__livistona_chinensis_-_fan_palm.glb", (gltf) => {
    const model = gltf.scene;
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
      }
    });

    for (let i = 0; i < 2; i++) {
      const clonedModel = gltf.scene.clone();
      clonedModel.position.set(2800 + i * 1000, -112, 11040);
      clonedModel.scale.set(50, 50, 50);
      scene.add(clonedModel);
    }
  });

  //load drawer model
  loader.load("./src/office_drawer.glb", (gltf) => {
    const model = gltf.scene;
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
      }
      model.position.set(4150, -112, 10720);
      model.scale.set(30, 30, 30);
      scene.add(model);
    });
  });

  //load sm_chair
  loader.load("./src/sm_chair_table.glb", (gltf) => {
    const model = gltf.scene;
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
      }
      for (let i = 0; i < 3; i++) {
        const clonedModel = gltf.scene.clone();
        clonedModel.position.set(2950, -112, 10740 - i * 200);
        clonedModel.scale.set(45, 45, 45);
        scene.add(clonedModel);
      }
    });
  });

  //load marker
  loader.load("./src/3d_lowpoly_arrow.glb", (gltf) => {
    const model1 = gltf.scene.clone();
    model1.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
      }
    });
    model1.position.set(3400, -111, 11700);
    model1.scale.set(3000, 3000, 3000);
    model1.rotation.y = THREE.MathUtils.degToRad(-90);
    scene.add(model1);

    // Second instance
    const model2 = gltf.scene.clone();
    model2.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
      }
    });
    model2.position.set(3400, -111, 11390);
    model2.scale.set(3000, 3000, 3000);
    model2.rotation.y = THREE.MathUtils.degToRad(-90);
    scene.add(model2);
  });
}

export function lobbyCharacter(body) {
  console.log("function calling",body);

  const mixers = []; // Array to store individual animation mixers

  for (let i = 0; i < body.length; i++) {
    const loader = new GLTFLoader();

    loader.load("./src/carla_-_sitting_idle.glb", (gltf) => {
      const model = gltf.scene;
      console.log("loading char");
      model.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
        }
      });

      model.position.set(i * 350 + 2640, -97, 9600);
      model.scale.set(18, 18, 18);
      console.log(gltf.animations);

      // Animation
      const animations = gltf.animations;
      if (animations && animations.length > 0) {
        const mixer = new THREE.AnimationMixer(model);
        const animationClip = animations[0];
        const animationAction = mixer.clipAction(animationClip);

        // Play the animation
        animationAction.play();

        mixers.push(mixer); // Store the mixer in the array
      }

      scene.add(model);
    });
  }

  // Animation Loop (Outside the loader callback)
  function animate() {
    requestAnimationFrame(animate);

    // Update each animation mixer
    for (const mixer of mixers) {
      mixer.update(clock.getDelta());
    }

    renderer.render(scene, camera);
  }

  animate();
}

var keypressed = {};

// KEY DOWN EVENT
document.addEventListener(
  "keydown",
  function (event) {
    keypressed[event.key.toLowerCase()] = true; // Setting the property of the object true on key press down
  },
  false
);

// KEY UP EVENT
document.addEventListener(
  "keyup",
  function (event) {
    keypressed[event.key.toLowerCase()] = false; // Setting the property of the object false on fey press up
  },
  false
);

window.addEventListener(
  "resize",
  () => {
    OnWindowResize();
  },
  false
);

function OnWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// CLOCK
var clock = new THREE.Clock();

function RAF() {
  requestAnimationFrame(() => {
    let mixerUpdateDelta = clock.getDelta();

    if (characterControl) {
      characterControl.update(mixerUpdateDelta, keypressed);
    }

    orbitControls.update();
    renderer.render(scene, camera);
    RAF();
  });
}

// // Helper to show axes
const axesHelper = new THREE.AxesHelper(5);
axesHelper.position.set(3400, -112, 13800);
scene.add(axesHelper);


const inputs = [
  { question: "Company Name", name: "company_name", answered: false },
  {
    question: "Company registration date in DD/MM/YYYY format",
    name: "company_registration_date",
    answered: false,
  },
  {
    question: "Proposed Bank Of The Company",
    name: "company_bank",
    answered: false,
  },
  {
    question: "Activities Of The Company",
    name: "dt_company_activity",
    answered: false,
  },
  {
    question: "Facility Of The Company",
    name: "dt_company_facility",
    answered: false,
  },
  {
    question: "Legal Status Of The Company",
    name: "company_legal_status",
    answered: false,
  },
  { question: "Share Capital", name: "share_capital", answered: false },
  {
    question: "Name Of The Share Holder",
    name: "shareHolder_name",
    answered: false,
  },
  {
    question: "Role Of The Company",
    name: "role_in_company",
    answered: false,
  },
  { question: "Emirates I D", name: "emirates_id", answered: false },
  {
    question: "Share Holding Percentage",
    name: "share_holding",
    answered: false,
  },
  {
    question: "Official Mail Address",
    name: "mail_address",
    answered: false,
  },
  { question: "Contact Number", name: "contact_number", answered: false },
  {
    question: "Additional Details",
    name: "additional_details",
    answered: false,
  },
];
var result = {};

if ("speechSynthesis" in window) {
  console.log("Web Speech API supported!");
} else {
  console.log("Web Speech API not supported :-(");
}

function speak(sentence) {
  const text_speak = new SpeechSynthesisUtterance(sentence);

  text_speak.rate = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
  return true;
}

function wishMe() {
  var day = new Date();
  var hr = day.getHours();

  if (hr >= 0 && hr < 12) {
    speak("Good morning");
  } else if (hr >= 12 && hr < 17) {
    speak("Good Afternoon");
    console.log("Good Afternoon");
  } else {
    speak("Good evening");
  }
}

export function loadRegistartion() {
  var Username = localStorage.getItem("username");
  console.log(Username )
  welcome.innerHTML = `Welcome ${Username} ! Please Share the following details`;
  speak(`Hello, ${Username}`);
  wishMe();
  speakInput();
}

async function speakInput() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  for (const input of inputs) {
    speak(`Please share the ${input.question}`);
    question.textContent = `Please share the ${input.question}`;

    await new Promise((resolve) => {
      inputContainer.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!input.answered) {
          input.answered = true;
          // details.innerHTML += `<div class="eachDetail">${input}&nbsp:&nbsp<span class="eachDetailAnswer">${inputBox.value}</span></div>`;
          details.innerHTML += `<div class="eachDetailReg"><label for=${input.name} >${input.question}&nbsp:&nbsp</label>
          <input type="text" id=${input.name} name=${input.name} value=${inputBox.value}></div>`;
          inputBox.value = "";
          resolve();
        }
      });

      micOn.addEventListener("click", () => {
        // Handle mic activation
        micOff.style.display = "block";
        micOn.style.display = "none";
        eclipse.style.display = "none";
        wave.style.display = "block";
        recognition.start();
      });

      micOff.addEventListener("click", () => {
        // Handle mic deactivation
        micOff.style.display = "none";
        micOn.style.display = "block";
        eclipse.style.display = "block";
        wave.style.display = "none";
        recognition.stop();
      });

      recognition.onresult = (event) => {
        // Handle speech recognition result
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        result[input] = transcript;
        input.answered = true;
        // details.innerHTML += `<div class="eachDetail">${input}&nbsp:&nbsp<span class="eachDetailAnswer">${transcript}</span></div>`;
        details.innerHTML += `<div class="eachDetailReg"><label for=${input.name} >${input.question}&nbsp:&nbsp</label>
        <input type="text" id=${input.name} name=${input.name} value=${transcript}></div>`;
        resolve();
      };

      recognition.onerror = (event) => {
        // Handle speech recognition errors
        speak("Sorry, I didn't get that. Please try again.");
        console.error("Speech recognition error:", event.error);
      };
    });
  }

  speak("Thank you and upload all the required documents");
  question.textContent = "Thank you and upload all the required documents";
  detailsPdf.style.display = "block";
}

detailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.elements);
  canvas.style.opacity = 1;
  document.querySelector(".registeration").style.display = "none";
  updateMovement(true);
  handleFormSubmission(e);
});
