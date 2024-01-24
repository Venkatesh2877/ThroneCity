import { scene, canvas } from "./main";
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import {TTFLoader} from 'three/examples/jsm/loaders/TTFLoader';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import { updateShowingDetail,updateMovement } from "./characterControls";


var formData = new FormData();
export var list=[{companyName:"SimplyFi",logo:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIODxUQDxAVFRUSGRkbFxgVFRUVFRgXFxcXGRYXFRYYHSggGBomHRUVITEiJikrLjAwFx8zODUtNygtLi4BCgoKDg0OGhAQGi0mICUrLS02Ly0tLS0tLS0tLS0tLSsvLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAO0A1QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwECBAUGAwj/xAA/EAABAwEGAwQIBQIFBQEAAAABAAIDEQQFBjFBURIhYSJxgZEHEzJCUnKhsRQjYsHR0vBDgpKi4RUkM1OTFv/EABoBAQACAwEAAAAAAAAAAAAAAAAEBQECAwb/xAAvEQACAQIEAgoCAgMAAAAAAAAAAQIDEQQSITEFURNBYXGBkaHB0fAiseHxMkJD/9oADAMBAAIRAxEAPwCcUREAREQBERAEREAREQBF4Wm0MiY6SRwYxgJc5xAAAzJJyUX4h9Loa4su+EPA/wAWXiDT8sYoadSR3LpTpTqO0Uc51IwV5MldFAZ9Kd5cVfWRU29UKfz9V0eH/S9VwZeEIaD/AIkPFQfNGSTTqCe5dpYSqlfc5xxVNu1yWUWPZLUyaNssT2vY8Va5pqCOhCyFFJAREQBERAEREAREQBERAEREAREQBERAEREAREQBEUY+ljGPqWmwWZ35jx+c4e4wj2B+pwz2Hfy6U6bqSyo0qTUI5mcx6T8Zfj5fw1nf/wBvEeZGUrx73Vg03z2pwdFdRFdwpqEcsSlnUc5ZmW0SiuVFvY0Ohwhi+0XVJ+WeOJx7cTj2T1afcd1HiCp2w5iKC8ofW2d9ae0w8nsOz2/vkdF8z0WbdN5zWOZs9nkLHt1GRGrXDJzTsVEr4aNTVaP7uSqGJdPR6o+pEXF4Jx5DeQEUtIrR8Fey+mZiJz34cx1pVdoqqcJQdpItIyUleIREWpsEREAREQBERAEREAREQBERAEREARFrb9vaKw2d9omNGsHIDNzj7LW7klZSbdkYbsrs02PcWNuyz1bQzy1ETTpu9w+EfU0G9IBnldI5z3uLnPJLieZJJqSTvVbDEF8S2+0PtEx7Tshoxo9ljeg+pqdVraK6w9Doo67vcpsRX6WWmy2+SxVorqKlFJI9ylFbRX0RYFyyirRXK1DNwxxaQQSCDUEGhBGRB0KlbA3pM9mz3i7o2f7Cb+vz1KilVouVWjGorSOlKtKm7o+qmPBAINQciMir1AeCseTXcRDLWWz/AA17cfWInT9J5d3NTddN6RWyJs1nkD2O1Gh1Dhm0jYqnrUJUnrtzLejXjVWnkZyIi4nYIiIAiIgCIiAIiIAiIgCIiA8ppWsaXvIa1oJJJoAAKkk6BQLj7FTrztHYJEEVRG3Ku8jhudNh4ro/Spi/1jjYbO7stP5zh7zh/hg7A59eWhrGitsFhsq6SW/V3fyVWNxN30cfH4LaKlFcpJwV6NvXNbaLdxNYebYhVrnDeQ5tHQc+oyUurVjSV5Mh0qUqjtEjeKJzzwsaXE5BoJPkFnf9BtdK/hJ6b+pkp58K+irFYYLIzhhjjib+kBte86nvXp/1GH/2N81XT4kk9EvFlhHAL/aX3xPmF7C0kOBBGYPIjvCovpi8rrs9tZwzxRyt0JAJHyuHNp6gqKcZejZ9mBnsXFLEObozzkYN209tv1HXmVIpY2E3Z6frzONXBTgrx1XqR7RUoqpRTbEIpRUorlRYM3KUW1w5iG0XdN62zv5H22Hmx42cPscwtWqrEoqSszMZOLuj6Hwni2C846xnglaO3E49pvUfE3qPGmS6NfLNltD4ZGyxPLHsNWuaaEHopkwR6RGWvhs9sLWT5NflHIdPkf0yOmdFU4jBuH5Q1Xqi1w+LU/xno/2SEiIoRNCIiAIiIAiIgCIiALiPSRi38BF6iB3/AHEozH+Gw8i/5jkPE6c93ivEEd3Wd0z+bjyjZq9+g7hmTt4KAbxtslplfNM7ifIauPXYbACgA0ACnYLDdJLPLZerIWMxPRrLHd+iMUqlFWiUV0Umh23otw4LXaDaJW1is9CAcnSHm0HcN9o/5VL163gIG8ubnZD9ytF6MLGIbriNOcpe93UlxA/2tavK9rRxzvOx4R3N5fyfFeX4rimpO3Oy+95e4ePR0Vzep5zTOeeJ7iT1/bZWVXnVUqvP5jcybPaXRmrHEH7941XRXberZey6jX/Q938LlOJV4l2pV5U3ptyNoyaLcbejyO2cU9kDY5s3NyjkOtfhf1yOu6hy12V8Mjo5GFj2GjmuFCCvoG7L7pRkx5aO/q/lUxThWC84/wAwcMgHYlaAXDYH4m9PKma9JgeJJqz1XqvlfURq+FjU/KGj/Z880VKLcYiw9Pd8vq7Q3kfYeObHjdp33B5halXkWpK61RVSTi7NaltEorlRGjBbRKK6iUQEhYH9Iz7NwwW4l8WTZObpI+jtXt+o68gJgs87ZWNkjcHNcAWuaQQQciCM18u0UkeiHELo5jYZHVZJV0VfdeObmjYOAJ7x1Vbi8JGznDxXuWWExTuoS8CYERFVlmEREAREQBYlutjLPE6aVwaxgq4nYfc6UWWoj9Kl/Omn/BsP5cNC+nvPIrz6NBHiTsF2w9F1ZqPn3HGvWVKGb7c5bFl/yXjaTM+oYOUbPhZ/Ucyf2AWjovcsVCxeigoxSjHZHnpylJuT3Z40VKL1LFTgW1zUnn0dzB912cjRpb4te5p+y1V4N4ZpAdHO+pqPoVrPQ/fA4ZLG882njj6g0D2juIBp+o7LqsTXeT+cwV5dsd2R/Y+C8hxehJSlbqd/Bl/Sl0lGMly/RoOJKrz4k4l5+5k9apVefEnElwelVsLsvZ0Boe0zbbq3buWr4k4lvCo4O8dzKdjsrVZrPb4DHI1skbswcwfu1w3HNQ9jPAktgJlirLZ/ip24+kgGn6hy3ou2sdsfC7iYabjQjYhdZdt5x2ltOQdTtMPPlrTcK+wHE2nb06n3ffM1q0oV1Z7nzbRUopUxt6OK8Vou9tDm6HTqYtvl8tlFz2FpIcCCDQgihBGYI0K9PSrQqxvEp61GVJ2l/ZZRUor1RdTkW0WzwtKY7fZnNzEsXkXtBHiCQtcum9HN1m03lCadmE+scdgw1b5u4R5rnVaUJN8mdaKbqRS5on5ERebPRBERAEREAXz7fhL7VO52bpHk/wCpy+glCuNbtMFul5cpHGRvUOJJ8ncQ8FP4fJKbXYQMfFuCfacyWK0sWYWK0sVtmKqxiFioWLLLFYWJmMWLLFaHwStmicWvjILSNCPuNCNQSpqwliyK8GBtQydo7cZ13cyvtN+o13MLlirC50bg9ji1zTUOaaEHcEZLhiKEay10a2fsd8PXlRem3L3Jpvi4A6skAodWZA/LsemS5hwINCCCMweRHeszCGO2zUgthDZMmyZMfsHaNd9D0yXVXxc7LSK+y8ZO36O3C8pjeGyjJuKs+XU+775FtGUaqzQOI4k4lfbLM+B/BI2h+hG4OoXhVUbunZ7mD14k4l5cScSXMHtxKrJC0hzSQRkRmF48SVTMDrrnv4PpHOQHaOyDu/Y/RYGMcEQ3iDIykU+jwOy+mQkAz+bMdcloKrc3TiB0NGSAvZp8Te7cdFbYPicqbWZ+Pz97zZ5ZrLPYh+9brmscphtEZY4b5EbtOTh1CwqL6VLIbVH2mslYdHNDh4hwzWE3CthBr+Dh/wDm0jyIovUQ4nFpXj5MhS4br+MtCB7luS0W6T1dmiLzqcmN6udkPvspvwbhiO7IOAHikfQyPpmRkBs0VNO8nVb6CFsbQ1jQ1oyDQAB3AL1UXEYuVbS1kSsPhI0db3YREUQlhERAEREAWhxVh9tuiArwyMqWO782u/SeXdRb5FtGTi7rc1lFSVnsQTb7uks8himYWuGh1G4Oo6rHLFNl8XPFbI+CVuXsuHJzTu0/tkoxv7D0tif2xxMPsvA5Hofhd08qq2oYpVNHo/uxVVsM6eq1X3c54sVCxZRYqFik3I+UxCxWliyyxCxZzGuUxDGutwljN9lpDaeKSHIHN8fd8TemY02XNFioWLScI1FlkbQlKDzRZN8kcNshBqHscKtc0/Vp0P8AZXH3xc8llNfaYcnD7HYrlsPX9NYH1jPEw+1GT2XdR8Luo8aqU7mviG3xF0ZB0ex1OJtdHDUdcivP8Q4Ypa+T9n97mWlOrCsuUjguJOJdDfmGiyslnBLdWZuHy7jpn3rmeJeXrUp0pZZ/33Bxaep61TiXnxJxLlcXPXiVOJefEnEmYwbC7rykszuKM8jm0+ye/wDldvdd6x2ltWGjhm05j+R1UccS9IpnRuDmOLXDIjNS8NjZUXbdcvj7Y3hNxJTRafD97/iozxUEjPaG+xC3C9BTqRqRUo7MkJ3VwiItzIREQBERAFhW68orOPzZGt6Zu8GjmtRiq/fwwEUR/McK1z4W7950XBPeXEucSScyTUk9SqzF8RVGWSCu/Rfz5HKdSzsiRP8A9ZZa09Ye/gdT7LNhtMFrYWtcyRpHabny6tPMKLqq+zzuicHxuLXNyIzUOnxaqn+cU12aP1bRoqz6zfYhwaYwZbLVzdWZuHyn3h0z71x5YpNw/iVlopHLRkmmzu7Y9PJW4jwuy01kioyXX4X/ADbHr5r1OE4hGrFO91z9n98zjVwyks1PyI0MasLFsLTZHxPLJGlrm5g/3zHVeJjVnmIWUxSxWFiyyxULFm5jKYZYvax2mSzyCWF5a5uRH2I1HQr0LFQsS5ixJGGcVstYEctGTbe6/qwnX9Ofeva/cOtnrJFRsmuzu/Y9VGHBTJdphrGBbSK2GoybLqOkn9XnuqvGcPjOLsrrly7V1+5PpYlSWWp5mjmjdG4se0tc3MHNWcSka+bpjtkfOgcB2HjTbvadlHFohdE90bxRzTQj+9F43F4WWHa1uns/Z9v7Ok4ZRxqvEvKqVUS5oevEnEvPiVKpmBusMWox2uPZ/ZP+bL60UjKMMOsL7XCB8VfBvaP2Unq/4U26Uu/2RIo7BERWh1CIiAIiLK3BE172ozWiSQ+8407gaNHkAsOq9LZEY5HsObXOHkSF41Xjp3cm3vd+ZCLqqtVZVFpYwX1XVYfxWY6RWklzdH5ub83xDrn3rkqpVdqFadGWaD/nvNoycXoSned2Q22McVDyqx7aEiux1HRcDe1zyWV/DIKg+y4ey7+D0V9xX/JYzQdqM5sJy6g6H6H6rvrNaIbbDVtHsdmDmDsRof7C9TgOJxmrLfrXx2fWbyhGquTIuLELF0t+YcdZ6vjq6P8A3N79x1WiLFdxqKSuiHKDi7MxCxULFlGNULFvc0sYhYrSxZZYhYs5jGU6rAd6k1srzWgrHXQe8361HirsfWIAstAH6HfUtP0I8lo8N1bbISPip4EEH7rscaNBsTzsWEf6wPsSqLjFJOnPuv4rX2J1F5qTT6iO6pVedVWq8caF9UqrKrfYVuX8VJxyD8ph5/qd8Pdv/wArelSlVmoR3f25lK7sjdYJuksabRIObxRg/Tq7x5U6d661UAVV6qhRjRgoR+9pMjHKrBERdjIREQBERAcFjm5yx5tUYq11PWU912QPceXj3rkqqZ3sBBBFQcwciuJxJhAistkFRmY9R1Zv8vlsqbG4B3dSn4r4+OfecKlN7o4+qVVpSqpziXVSqtqq1WTBWqyrvvCSzP8AWROoddiNnDULEqlUTad1uZvYk64cQR2wcPsyAc2H7tOo+oWJfWGw6slnAB1ZkD8ux6ZKPGSFpDmkgjmCDQg7g6LuMOYuD6RWogOyEmTT0d8J65dyvsDxN3UZuz59T7+307jtmjNZZmgfEQaEUIzB5Ed6tLF397XOy0ivsv0cNejtwuTt11yQHtt5fEObT4/yvR06yn3kedFxNUWK0xrKLFm2G55Zz2W0b8TuTfDfwXRySV2c1FvYvwjYS+0h9OUQJPeQQ0fUnwW1x7aQ2zCPWRw8m8yfPh81urFZI7JFQEAN5uceVeXNx2Ub4kvf8ZOXj2G9lg6bnqTz8tlQcWxSyNdb0Xd1v71slqPR07dbNbVKq2qvgjdI9rGDic40AGpXmLHEzbnu19rmETOQzc7Ro1PfsFKNisrIY2xxijWig/k7k5rCw/dDbHDwDm53N7tzsOg0/wCVtl6PBYXoYXl/k/Ts+e0lU4ZV2hERTjoEREAREQBERAEREBzmIsMMtdXx0ZLv7rvmA16/dR1a7K+B5jlaWubmD9wdR1U0LW3xc8VrZwSt5j2XD2mnof2yVfisCqv5Q0l6P4fac5009VuRJVKrY35cktifSQVYfZeB2T0Pwu6fdayqo5RlB5ZKzI7TW5dVKq2qVWpguqlVbVKrFgdJh/FcllAjkBkjGQr2m/KTmOh+i7Ww4gs047EzQT7rzwO8nZ+Ciaqop1HHVKay7rt+f7OkajiTRSIdrsd/Z+6114YkssA5yhx+FnbPdy5DxIUUcI2VV3lxSbWkUvG/sjZ1eSN9f+JZLZ2AOCL4Qebti4692XetJVW1Sqrqk5VJZpu7OTbbuy6qkPBtw/h2eulH5jxyB9xp+zjr5brS4JuH1zhaZR2GHsA+84e98oP17lIatOH4X/rLw+fjs160dqUOthERW52CIiAIiIAiIgCIiAIiIAiIgPG0wMlYWSNDmu5EEVBUdYlwk+zVlgq+LMjNzO/4m9cxrupLRR6+GhWVpefWjWUFIg2qVUgYmweJazWUBr8yzJrvl+F30PTNR/K1zHFrwWuaaEEUIOxBVDXw86MrS8+ZGlFxYqq1XnVKrianpVKqyqVQF9UqrKpVAX1W3w1crrbNw8xGyhkd00aOp+nMrXXdYn2mVsUQq5x8ANXHoFLl0XayyQtijyHMnVzjm4/3spmDwvTSvL/FevZ8+XWdKcMzMqGJrGhjAA1oAAGQAyAXqiL0BJCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAtFiHDsVubU9iUDsvA59zh7w/sLeotZwjNZZK6MNJ7kKXpdstlk9XM2h0I5tcN2nULEqpqvK7orVGY5mhzT5g7tOhUYYkwzLYTxCr4jk8DmNg8aHrkemSo8TgpUvyjrH9fef6OE6dtUaSqVVlVWqh2ORdVGgkgAEk8gBzJJyAG6squ/wHh0tpa520J/8AE06A++RudPPULrRoSqyyr+jaMXJ2NxhK4BYouJ4BmkHbOw0YO7Xc+C6JEXoqdONOKjHZEpJJWQREW5kIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiALzewOBDgCDyIPMEbEL0RAcdeuAoJSXQPMJOlONngKgjzp0WqHo5lrztLab8Dq+Vf3UjIossHRk7uPldfpmjpxfUcvc2CrPZnB8hMzxlxABgO4Z/JK6hEXenTjTVoqxsklsERFuZCIiAIiIAiIgCIiAIiID//2Q==" , 
id:"company0001", bankName:"Bank of America",legalStatus:"Legal",shareHolderName:"Vishwa", roleInCompany:"CTO", CertificateOfRegistration:"./src/assets/Certificate of registration.pdf", 
ESTABLISHMENTCARDMempac:"./src/assets/ESTABLISHMENT CARD Mempac 2020.pdf", MempacLicenseCertificate:"./src/assets/Mempac License Certificate 2020.pdf", SHARECERTIFICATE:"./src/assets/SHARE CERTIFICATE.pdf",MempacELicenseCertificate:"./src/assets/Mempac -E-License certificate0.pdf",MOA:"/src/assets/MOA.pdf"},

{companyName:"Google", logo:"data:image/png;base64,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", id:"company0002", bankName:"SBI",legalStatus:"Illegal",shareHolderName:"Karthick", roleInCompany:"Associate", CertificateOfRegistration:"./src/assets/Certificate of registration.pdf", 
ESTABLISHMENTCARDMempac:"./src/assets/ESTABLISHMENT CARD Mempac 2020.pdf", MempacLicenseCertificate:"./src/assets/Mempac License Certificate 2020.pdf", SHARECERTIFICATE:"./src/assets/SHARE CERTIFICATE.pdf",MempacELicenseCertificate:"./src/assets/Mempac -E-License certificate0.pdf",MOA:"/src/assets/MOA.pdf"},


{companyName:"ITC", logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/ITC_Limited_Logo.svg/983px-ITC_Limited_Logo.svg.png",  id:"company0003", bankName:"Bank of Baroda",legalStatus:"Illegal",shareHolderName:"Ali", roleInCompany:"Manager", CertificateOfRegistration:"./src/assets/Certificate of registration.pdf", 
ESTABLISHMENTCARDMempac:"./src/assets/ESTABLISHMENT CARD Mempac 2020.pdf", MempacLicenseCertificate:"./src/assets/Mempac License Certificate 2020.pdf", SHARECERTIFICATE:"./src/assets/SHARE CERTIFICATE.pdf",MempacELicenseCertificate:"./src/assets/Mempac -E-License certificate0.pdf",MOA:"/src/assets/MOA.pdf"},

{companyName:"Honda", logo:"https://w7.pngwing.com/pngs/540/52/png-transparent-honda-logo-car-honda-integra-toyota-honda-angle-text-rectangle.png",id:"company0004", bankName:"Canada Bank",legalStatus:"Legal",shareHolderName:"Vishnu", roleInCompany:"CTO", CertificateOfRegistration:"./src/assets/Certificate of registration.pdf", 
ESTABLISHMENTCARDMempac:"./src/assets/ESTABLISHMENT CARD Mempac 2020.pdf", MempacLicenseCertificate:"./src/assets/Mempac License Certificate 2020.pdf", SHARECERTIFICATE:"./src/assets/SHARE CERTIFICATE.pdf",MempacELicenseCertificate:"./src/assets/Mempac -E-License certificate0.pdf",MOA:"/src/assets/MOA.pdf"}]



function loadLobby(body){
    const loader = new GLTFLoader();
    console.log(body);
    // Load the 3D model
    loader.load("./src/office_cabin.glb",  (gltf)=> {
          gltf.scene.traverse(c=>{  
            c.castShadow=true;
          });

      if(body.companyId){
        const company= list.find((each)=>each.id==body.companyId);
        if(company){
          gltf.scene.position.set(2700, -112, 9040);
          gltf.scene.scale.set(30,40,40);
          gltf.scene.rotation.y= THREE.MathUtils.degToRad(180);
          scene.add(gltf.scene);

          const fontLoader=new FontLoader();
          fontLoader.load(
            'node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json',
            (droidFont)=>{
              const textGeometry= new TextGeometry(company.companyName,{
                height:2,
                size:30,
                font:droidFont,
              });
              const textMaterial=new THREE.MeshBasicMaterial({color:0xa6a6a6});
              const textMesh=new THREE.Mesh(textGeometry, textMaterial);
              textMesh.position.set(2530,55,9900);
              scene.add(textMesh);
            }
          )

          // Image
          const textureLoader = new THREE.TextureLoader();
          console.log(company.logo)
          const imageTexture = textureLoader.load(company.logo); // Set the path to your image
          const imageMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, transparent: true });
          const imageGeometry = new THREE.PlaneGeometry(50, 50); // Adjust the size as needed
          const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
          imageMesh.position.set(2500,75,9900); // Adjust the position as needed

          scene.add(imageMesh)
        }
               

      }else if(body.userName){
        //  Create multiple instances of the model
        for (let i = 0  ; i < list.length; i++) {        
            const clonedModel = gltf.scene.clone();
            clonedModel.position.set((i * 350)+2700, -112, 9040);
            clonedModel.scale.set(30, 40, 40);
            clonedModel.rotation.y = THREE.MathUtils.degToRad(180);
            scene.add(clonedModel);
            const fontLoader=new FontLoader();
            fontLoader.load(
              'node_modules/three/examples/fonts/droid/droid_sans_mono_regular.typeface.json',
              (droidFont)=>{
                const textGeometry= new TextGeometry(list[i].companyName,{
                  height:2,
                  size:30,
                  font:droidFont,
                });
                const textMaterial=new THREE.MeshBasicMaterial({color:0xa6a6a6});
                const textMesh=new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set((i*350)+2530,55,9900);
                scene.add(textMesh);
              }
            )
            
                // Image
            const textureLoader = new THREE.TextureLoader();
            console.log(list[i].logo)
            const imageTexture = textureLoader.load(list[i]?.logo); // Set the path to your image
            const imageMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, transparent: true });
            const imageGeometry = new THREE.PlaneGeometry(50, 50); // Adjust the size as needed
            const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
            imageMesh.position.set((i*350)+2500,75,9900); // Adjust the position as needed

            scene.add(imageMesh)
              }

      } else if(body.task){
        gltf.scene.position.set((350*(list.length-1))+2700, -112, 9040);
        gltf.scene.scale.set(30,40,40);
        gltf.scene.rotation.y= THREE.MathUtils.degToRad(180);
        scene.add(gltf.scene);
        

        const fontLoader=new FontLoader();
        fontLoader.load(
          'node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json',
          (droidFont)=>{
            const textGeometry= new TextGeometry(list[list.length-1].companyName,{
              height:2,
              size:30,
              font:droidFont,
            });
            const textMaterial=new THREE.MeshBasicMaterial({color:0xa6a6a6});
            const textMesh=new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set((350*(list.length-1))+2530,55,9900);
            // textMesh.position.x=350;
            // textMesh.position.z=-120;
            scene.add(textMesh);
          }
        ) 
        
            // Image
            const textureLoader = new THREE.TextureLoader();
            const imageTexture = textureLoader.load(list[list.length-1].logo); // Set the path to your image
            const imageMaterial = new THREE.MeshBasicMaterial({ map: imageTexture, transparent: true });
            const imageGeometry = new THREE.PlaneGeometry(50, 50); // Adjust the size as needed
            const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
            imageMesh.position.set((350*(list.length-1))+2500,75,9900); // Adjust the position as needed

            scene.add(imageMesh)

      }    
    });
  
  }

  // Function to handle form submission
async function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission
    canvas.style.opacity = "1";
    document.querySelector('.input').style.display = "none";
    updateMovement(true);

    if(event.target.elements.Company){
      loadLobby({companyId:event.target.Company.value});
      console.log("company");
      sessionStorage.setItem("companyId", event.target.Company.value);
      sessionStorage.removeItem('username');
      const response = await fetch(`http://20.25.46.73:8081/api/getCertificatesUploaded?username=Venkatesh&dmccId_certs=${event.target.Company.value}`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json", 
        },
      });
      const jsonData= await response.json();
      console.log(event.target.Company.value, jsonData);

    }else if(event.target.elements.confirmPassword){
      //loadLobby({userName:event.target.username, password:event.target.password, confirmPassword:event.target.confirmPassword});
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('companyId');
      const body={
        "username":event.target.username.value
      }
      const response = await fetch("http://20.25.46.73:8081/api/registerenrolluserdmcc", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(body), 
      });
      const jsonData= await response.json();
      console.log(event.target.username.value, jsonData);
      list=[];
      
    }else if(event.target.elements.companyName){
      console.log("register company");
      list.push({
        companyName:event.target.elements.companyName.value, id:event.target.elements.id.value, bankName:event.target.elements.bankName.value,
        legalStatus:event.target.elements.legalStatus.value, shareHolderName:event.target.elements.shareHolderName.value, 
        roleInCompany:event.target.elements.roleInCompany.value, passport:event.target.elements.passport.value, 
        emirateID:event.target.elements.emirateID.value, bankStatement:event.target.elements.bankStatement.value,
      });
      console.log(list);
      // const body={
      //   "Incorporation":,
      //   "MoaAndAoa":,
      //   "Incumberency":,
      //   "UndertakingLetterOfShareCapital":,
      //   "AuthorizationLetter":,
      //   "DeclerationOfUltimateBenefitialOwners":,
      //   "ValidPassportCopy":,
      //   "UtilityBillForAddressProof":,
      //   "EmirateId":,
      //   "BussinessProfile":,
      //   "IncorporationOfSubsidaryInDmcc":,
      //   "data":{
      //     "username": sessionStorage.getItem("username"),
      //     "DmccId_certs":event.target.elements.id.value,
      //     "StatusIncorporation": true ,
      //     "StatusMoaAndAoa": true,
      //     "StatusIncumberency": true,
      //     "StatusUndertakingLetterOfShareCapital": true,
      //     "StatusAuthorizationLetter": true,
      //     "StatusDeclerationOfUltimateBenefitialOwners": true,
      //     "StatusValidPassportCopy": true,
      //     "StatusUtilityBillForAddressProof": true,
      //     "StatusEmirateId": true,
      //     "StatusBussinessProfile": true,
      //     "StatusIncorporationOfSubsidaryInDmcc": true
      //     },      
      // }
            
      // const response = await fetch(`http://20.25.46.73:8081/api/putCertificatesUploaded`, {
      //   method: "POST", 
      //   headers: {
      //     "Content-Type": "application/json", 
      //   },
      //   body: JSON.stringify(body), 
      // });
      // const jsonData= await response.json();
      // console.log(event.target.Company.value, jsonData);
      loadLobby({task:"newCompany"})

    }else{
      loadLobby({userName:event.target.username.value, password:event.target.password.value});
      console.log("old user");
      sessionStorage.setItem("username", event.target.username.value);
      sessionStorage.removeItem('companyId');
    }
}

var companyListElement = document.getElementById('displayCompanyDetail');

const handleCancel=()=>{
  console.log("clicked")
  canvas.style.opacity=1;
  companyListElement.innerHTML="";
  updateShowingDetail();
  updateMovement(true);
}


//display each company detail
function displayDetail(list){
  // Populate the company list

    canvas.style.opacity=0.2;
    companyListElement.innerHTML=`
    <h1>Company Name: ${list.companyName}</h1>
    <h2>Company Id: ${list.id}</h2>
    <h2>Bank Name: ${list.bankName}</h2>
    <h2>Legal Status: ${list.legalStatus}</h2>
    <h2>Share Holder Name: ${list.shareHolderName}</h2>
    <h2>Role In Company: ${list.roleInCompany}</h2>
    <div class="docLink"><a href="${list.CertificateOfRegistration}" target="_blank">Certificate Of Registration</a></div>
    <div class="docLink"><a href="${list.ESTABLISHMENTCARDMempac}" target="_blank">ESTABLISHMENT CARD Mempac</a></div>
    <div class="docLink"><a href="${list.MempacLicenseCertificate}" target="_blank">Mempac License Certificate</a></div>
    <div class="docLink"><a href="${list.SHARECERTIFICATE}" target="_blank">SHARE CERTIFICATE</a></div>
    <div class="docLink"><a href="${list.MempacELicenseCertificate}" target="_blank">Mempac-E-License Certificate</a></div>
    <div class="docLink"><a href="${list.MOA}" target="_blank">MOA</a></div>
    
  `;
  
   // Create a button element
   var button = document.createElement("button");
   button.textContent = "Cancel";

   button.onclick = handleCancel;

   // Append the button to the div
   companyListElement.appendChild(button);

}

export {handleFormSubmission, displayDetail};