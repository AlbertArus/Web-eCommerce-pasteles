// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// const { EmailAuthCredential } = require("firebase/auth");

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDPb0Zo6mYa_msnaYvXDfQXJBKabA_p6Cc",
//   authDomain: "nina-cakes.firebaseapp.com",
//   projectId: "nina-cakes",
//   storageBucket: "nina-cakes.appspot.com",
//   messagingSenderId: "660826794013",
//   appId: "1:660826794013:web:255ca61c47380a3213fef4",
//   measurementId: "G-ZFLCHTVNCR"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

//Lógica de scroll y color de header

window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    let scrollPosition = window.scrollY;

    if (scrollPosition >= 30) {
        header.style.position = "sticky";
        header.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
        header.style.zIndex = "999";
    } else {
        // header.style.background = "#F4F4F4";
        header.style.boxShadow = "none";
    }
});

// Lógica de dejar header marcado

document.addEventListener("DOMContentLoaded", function() {
    let sectionnav = document.querySelectorAll("#navbar li a");
    let sectionactive = document.querySelectorAll("#navbar li a.active")

    sectionnav.forEach(section => {
        section.addEventListener("click", function() {

            sectionnav.forEach(section => {
                section.classList.remove("navbaractive")
                this.classList.add("navbaractive")
            });
        });
    });

    sectionnav.forEach(section => {
        section.addEventListener("mouseover", function() {
            this.classList.add("navbarhover");
        });
    });
    sectionnav.forEach(section => {
        section.addEventListener("mouseleave", function() {
            this.classList.remove("navbarhover");
        });
    });
});

// Lógica desplegar y cerrar menú lateral en media-query
document.addEventListener("DOMContentLoaded", function() {
    const bar = document.getElementById("bar");
    const close = document.getElementById("close");
    const nav = document.getElementById("navbar");

    if (bar) {
        bar.addEventListener("click", function() {
            nav.classList.toggle("active");
        });
    }

    if (close) {
        close.addEventListener("click", function() {
            nav.classList.remove("active");
        });
    }
});

// Lógica opciones de FAQ's

document.addEventListener('DOMContentLoaded', function() {
    const faqtopics = document.querySelectorAll(".faqstopic");
    const faqs = document.querySelectorAll(".faqlist");
    const faqsspace = document.querySelector(".faqsspace");

    faqtopics.forEach(topic => {
        topic.addEventListener("click", function() {
            const target = this.getAttribute("data-target");

            // Eliminar la clase "topicactive" de todos los faqtopics
            faqtopics.forEach(topic => {
                topic.classList.remove("topicactive");
            });

            // Añadir la clase "topicactive" al faqtopic seleccionado
            this.classList.add("topicactive");

            // Mostrar solo el faqlist relacionado con el faqtopic seleccionado
            faqs.forEach(faq => {
                if (faq.id === target) {
                    faq.classList.add("faqsactive");
                } else {
                    faq.classList.remove("faqsactive");
                }
            });
        });
    });
});

// Lógica FAQ's 

document.addEventListener('DOMContentLoaded', function() {
  const questions = document.querySelectorAll('.faq-box .faq-box-question');
  const answers = document.querySelectorAll(".faq-box .faq-box-answer");

  questions.forEach(question => {
      question.addEventListener('click', function() {
          const answer = this.nextElementSibling;
          const toggle = this.querySelector(".toggle");
          const isActive = this.classList.contains("active");

          // cerramos todas las abiertas
          answers.forEach(otherAnswer => {
            if(otherAnswer !== answer && otherAnswer.style.display === "block") {
              otherAnswer.style.display = 'none';
              otherAnswer.previousElementSibling.querySelector(".toggle")   .style.transform = "rotate(0deg)";
              otherAnswer.previousElementSibling.style.borderRadius = "25px";
              otherAnswer.previousElementSibling.classList.add("clicked");
              otherAnswer.previousElementSibling.classList.remove("active");
            }
          });

          // Ahora abre o cierra el this (en el que hemos clicado)
          if (answer.style.display === 'block') {
              answer.style.display = 'none';
              toggle.style.transform = "rotate(0deg)";
              question.style.borderRadius = "25px";
              this.classList.add("clicked");
          } else {
              answer.style.display = 'block';
              toggle.style.transform = "rotate(180deg)";
              question.style.borderRadius = "20px 20px 0px 0px";
              this.classList.add("active");
              this.classList.remove("clicked");
          };
      });
  });
});

// Active radiotestimonials

document.addEventListener('DOMContentLoaded', function() {
    const radioclicks = document.querySelectorAll(".radiotestimonial");

    radioclicks.forEach(radioclick => {
        radioclick.addEventListener("click", function() {

            // Elimino todos los radioclick activo
            radioclicks.forEach(radio => {
                radio.classList.remove("active");
            })
            // Ahora añade estado de active al radioclick en el que se ha hecho click
            this.classList.add("active");
            })
    });
});

// Combinación slider testimonials y navegación desde radiotestimonials

document.addEventListener("DOMContentLoaded", function() {
    const reviews = document.querySelectorAll(".testimonial-box-review");
    const radioTestimonials = document.querySelectorAll(".radiotestimonial");
    let counter = 0;
    let back = document.querySelector(".testimonial-back");
    let forward = document.querySelector(".testimonial-forward");
  
    reviews.forEach(
        (review, index) => {
            review.style.left = `${index * 840}px`; // Utiliza el ancho fijo de 840px para el desplazamiento
        }
    );
  
    radioTestimonials.forEach((radio, index) => {
        radio.addEventListener("click", () => {
            counter = index * 1;
            reviewSlide();
        });
    });

    back.addEventListener("click", () => {
        if (counter > 0) {
            counter--;
        } else {
            counter = reviews.length - 5;
        }
        reviewSlide();
    
        // Ajustar el índice del radio activo. Indica la posición actual (en array) y se resta 1 (estamos en back). Luego que esté dentro y se divide para posición absoluta
        const activeIndex = (getActiveRadioTestimonialIndex() + radioTestimonials.length - 1) % radioTestimonials.length;
    
        // Cambiar las clases de los radios
        radioTestimonials.forEach((radio, index) => {
            if (index === activeIndex) { // Si el índice actual ya es el radio anterior. Si lo es, pinta porque ahora nos situamos ahí
                radio.classList.add("active");
            } else { // Si no lo es, es que tenemos que movernos al indice - 1 así que ya no debe quedar activo
                radio.classList.remove("active");
            }
        });
    });
    
    forward.addEventListener("click", () => {
        if (counter < reviews.length - 5) {
            counter++;
        } else {
            counter = 0;
        }
        reviewSlide();
    
        // Ajustar el índice del radio activo
        const activeIndex = (getActiveRadioTestimonialIndex() + 1) % radioTestimonials.length;
    
        // Cambiar las clases de los radios
        radioTestimonials.forEach((radio, index) => {
            if (index === activeIndex) {
                radio.classList.add("active");
            } else {
                radio.classList.remove("active");
            }
        });
    });   
  
    const reviewSlide = () => {
        const displacement = -counter * 840; // Multiplica el counter por el ancho fijo de 840px. Multiplica por -1 para que se mueva hacia la izquierda (+1 si queremos derecha)
        reviews.forEach( // Como hay muchos review, decimos que a cada uno que le aplique la función (se determina cuál por el valor index) habrá que aplicarlo esos estilos
            (review) => {
                review.style.transform = `translateX(${displacement}px)`; // Utiliza píxeles para el desplazamiento. X porque es desplazamiento horizontal
                review.style.transition = "transform 0.4s ease"; // Formato de tranform -> transición suave y que se ejecuta en 0.4s todo el movimiento
            }
        );
    };
  
    const isRadioTestimonialActive = () => {
        return radioTestimonials[getActiveRadioTestimonialIndex()].classList.contains("active");
    };
  
    const getActiveRadioTestimonialIndex = () => {
        let activeIndex = -1; // Convención para cuando no se encuentra un valor que cumpla (como si fuera un else = nada)
        radioTestimonials.forEach((radio, index) => {
            if (radio.classList.contains("active")) { // Si encuentra algún radio que sí esté activo, entonces el número de índice del radio activo pasa a ser el valor del índice, para así saber dónde estamos
                activeIndex = index;
            }
        });
        return activeIndex;
    };
});

// Product preview

document.addEventListener("DOMContentLoaded", function() {
    const productBoxes = document.querySelectorAll(".product");

    productBoxes.forEach(product => {
        const supportImages = product.querySelectorAll(".productsupportimages img");
        const back = product.querySelector(".product-back");
        const forward = product.querySelector(".product-forward");
        const mainImage = product.querySelector(".main");
    
        function showMainImage() {
            supportImages.forEach(img => {
                if (img.classList.contains("mainpicture")) {
                    mainImage.src = img.src;
                }
            });
        }
    
        showMainImage();
    
        back.addEventListener("click", () => {
            const currentIndex = Array.from(supportImages).findIndex(img => img.classList.contains("mainpicture"));
            const previousIndex = (currentIndex - 1 + supportImages.length) % supportImages.length;
            supportImages[currentIndex].classList.remove("mainpicture");
            supportImages[previousIndex].classList.add("mainpicture");
            mainImage.src = supportImages[previousIndex].src;
    
            // Agregar la clase productactive a la imagen principal
            supportImages[previousIndex].classList.add("productactive");
            // Remover la clase productactive de las otras imágenes
            supportImages.forEach(img => {
                if (img !== supportImages[previousIndex]) {
                    img.classList.remove("productactive");
                }
            });
        });
    
        forward.addEventListener("click", () => {
            const currentIndex = Array.from(supportImages).findIndex(img => img.classList.contains("mainpicture"));
            const nextIndex = (currentIndex + 1) % supportImages.length;
            supportImages[currentIndex].classList.remove("mainpicture");
            supportImages[nextIndex].classList.add("mainpicture");
            mainImage.src = supportImages[nextIndex].src;
    
            // Agregar la clase productactive a la imagen principal
            supportImages[nextIndex].classList.add("productactive");
            // Remover la clase productactive de las otras imágenes
            supportImages.forEach(img => {
                if (img !== supportImages[nextIndex]) {
                    img.classList.remove("productactive");
                }
            });
        });
    
        supportImages.forEach(img => {
            img.addEventListener("click", () => {
                if (img !== mainImage)
                mainImage.src = img.src;
                supportImages.forEach(img => img.classList.remove("productactive"));
                img.classList.add("productactive");
            });
        });
    });
});

// Product specific

document.addEventListener("DOMContentLoaded", function() {
    const productBoxes = document.querySelectorAll(".product-specific");

    productBoxes.forEach(product => {
        const supportImages = product.querySelectorAll(".productsupportimages img");
        const back = product.querySelector(".products-back");
        const forward = product.querySelector(".products-forward");
        const mainImage = product.querySelector(".main");
    
        // function showMainImage() {
        //     supportImages.forEach(img => {
        //         if (img.classList.contains("mainpicture")) {
        //             mainImage.src = img.src;
        //         }
        //     });
        // }
    
        // showMainImage();
        
        const urlParams = new URLSearchParams(window.location.search);
        const img1Src = decodeURIComponent(urlParams.get('img1'));

        // Establecer la fuente de la imagen principal como la fuente de 'img1'
        mainImage.src = img1Src;
        
        back.addEventListener("click", () => {
            const currentIndex = Array.from(supportImages).findIndex(img => img.classList.contains("mainpicture"));
            const previousIndex = (currentIndex - 1 + supportImages.length) % supportImages.length;
            supportImages[currentIndex].classList.remove("mainpicture");
            supportImages[previousIndex].classList.add("mainpicture");
            mainImage.src = supportImages[previousIndex].src;
    
            // Agregar la clase productactive a la imagen principal
            supportImages[previousIndex].classList.add("productactive");
            // Remover la clase productactive de las otras imágenes
            supportImages.forEach(img => {
                if (img !== supportImages[previousIndex]) {
                    img.classList.remove("productactive");
                }
            });
        });
    
        forward.addEventListener("click", () => {
            const currentIndex = Array.from(supportImages).findIndex(img => img.classList.contains("mainpicture"));
            const nextIndex = (currentIndex + 1) % supportImages.length;
            supportImages[currentIndex].classList.remove("mainpicture");
            supportImages[nextIndex].classList.add("mainpicture");
            mainImage.src = supportImages[nextIndex].src;
    
            // Agregar la clase productactive a la imagen principal
            supportImages[nextIndex].classList.add("productsactive");
            // Remover la clase productactive de las otras imágenes
            supportImages.forEach(img => {
                if (img !== supportImages[nextIndex]) {
                    img.classList.remove("productsactive");
                }
            });
        });
    
        supportImages.forEach(img => {
            img.addEventListener("click", () => {
                if (img !== mainImage)
                mainImage.src = img.src;
                supportImages.forEach(img => img.classList.remove("productsactive"));
                img.classList.add("productsactive");
            });
        });
    });
});

// Additiontal products slider

document.addEventListener("DOMContentLoaded", function() {
    const additions = document.querySelectorAll(".addition");
    const content = document.querySelector(".contentslide");
    const back = document.querySelector(".productos-back");
    const forward = document.querySelector(".productos-forward");
    const steps = document.querySelectorAll(".stepslider");
    let current = 0;
    let cycling = false;

    // Update current slide
    function updateCurrent(index) {
        const slideWidth = additions[0].offsetWidth; // Ancho de cada slide
        const offset = -index * slideWidth; // Calcula el desplazamiento
        
        // Actualiza la transformación
        document.querySelector('.contentslide').style.transform = `translateX(${offset}px)`;
      
        additions.forEach(addition => {
            addition.classList.remove('additionactive');
        });
    
        additions[index].classList.add('additionactive');
    }

    // Initialize slider
    function init() {
        updateCurrent(0); // Set first slide
    
        if (cycling) {
            startCycling(); 
        }
    }
    
    init();

    // Next product
    function nextProduct() {
        current++;
    
        if (current > additions.length -4) {
            current = 0; // Reset to start
        }

        updateCurrent(current);

        // Al ir atrás, saco todos los active y el step del indice actual, se activa
        // Ponemos current y no index porque lo que actualizamos es Current (que contiene valor index)
        steps.forEach((step) => {
            step.classList.remove("active");
        });
        steps[current].classList.add("active");
    };

    // Previous product
    function prevProduct() {
        current--;
      
        if (current < 0) {
            current = additions.length - 4; // Reset to end
        }
      
        updateCurrent(current);

        // Al ir atrás, saco todos los active y el step del indice actual, se activa
        // Ponemos current y no index porque lo que actualizamos es Current (que contiene valor index)
        steps.forEach((step) => {
            step.classList.remove("active");
        });
        steps[current].classList.add("active");
    };

    //  Eventos de click en las arrows
    back.addEventListener("click", () => {
        prevProduct();
    });

    forward.addEventListener("click", () => {
        nextProduct();
    });

    // Activar steps según click
    steps.forEach((step, index) => {
        step.addEventListener("click", function() {

            // Elimino todos los radioclick activo
            steps.forEach(step => {
                step.classList.remove("active");
            })
            // Ahora añade estado de active al radioclick en el que se ha hecho click
            this.classList.add("active");

            // Actualizo index a nuevo current marcado por step
            updateCurrent(index);
            current = index;
            })
    });

    // Autoplay
    function startCycling() {
        interval = setInterval(() => {
            nextProduct();
        }, 2000); // Change product every 5 seconds
    }

    function stopCycling() {
        clearInterval(interval); // Change product every 5 seconds
    }

    // Detener y reanudar el Autoplay cuando estás encima
    content.addEventListener("mouseenter", () => {
        stopCycling()
    });
    content.addEventListener("mouseleave", () => {
        startCycling()
    });
});

// Botones transparentes marcados en configuración producto

document.addEventListener("DOMContentLoaded", function() {
    const sizes = document.querySelectorAll(".productssize .transparent");
    const deliveries = document.querySelectorAll(".productsdelivery .transparent");
    const custom = document.querySelectorAll(".productscustom button");

    sizes.forEach(transparent => {
        transparent.addEventListener("click", () => {
            // Eliminar la clase "active" de todos los botones
            sizes.forEach(button => {
                button.classList.remove("active");
            });
            // Marcar como activo solo el botón clicado
            transparent.classList.add("active");
        });
    });

    deliveries.forEach(transparent => {
        transparent.addEventListener("click", () => {
            // Eliminar la clase "active" de todos los botones
            deliveries.forEach(button => {
                button.classList.remove("active");
            });
            // Marcar como activo solo el botón clicado
            transparent.classList.add("active");
        });
    });
});

// Calendario datepicker

// document.addEventListener("DOMContentLoaded", function() {
//     // let datepicker = new Datepicker(".datepicker");
//     // let simple = new Datepicker("#simple");

//     let constrained = new Datepicker('#constrained', {
//         // 00 days in the past
//         min: (function(){
//             var date = new Date();
//         })()
//     });

//     // Modificar opciones
//     datepicker.set({
//         weekStart: 1, // La semana empieza en Lunes
//         defaultTime: true // Deshabilitar la hora predeterminada
//     });

//     // Obtener la fecha actual
//     let currentDate = new Date();

//     // Establecer la fecha actual como seleccionada por defecto
//     datepicker.setDate(currentDate.getDate() + 1);

//     // Modificar el color
//     document.querySelector('.datepicker').classList.add('custom-datepicker');
// }); //Lógica con Datepicker.js

// document.addEventListener("DOMContentLoaded", function() {
//     const calendar = flatpickr(".datepicker", {
//         enableTime: true,
//         dateFormat: "d/m/Y // H:i",
//         minDate: "today",
//         disable: [{ from: "today", to: "today" }],
//         locale: {
//             firstDayOfWeek: 1,
//             weekdays: {
//                 shorthand: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
//                 longhand: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
//             }
//         },
//         onReady: function(selectedDates, dateStr, instance) {
//             instance.calendarContainer.querySelector(".flatpickr-monthDropdown-months").style.width = "50%";
//             instance.calendarContainer.querySelector(".flatpickr-yearDropdown-years").style.width = "50%";

//             var currentDateElem = instance.calendarContainer.querySelector(".today");
//             if (currentDateElem) {
//                 currentDateElem.style.backgroundColor = "#d1ecf1"; // Cambia el color del día actual
//                 currentDateElem.style.borderRadius = "50%";
//                 currentDateElem.style.pointerEvents = "none";
//                 currentDateElem.style.border = "2px solid #007bff"; // Añade el borde al día actual
//             }
//         },
        // onChange: function(selectedDates, dateStr, instance) {
        //     var currentDateElem = instance.calendarContainer.querySelector(".today");
        //     if (currentDateElem) {
        //         currentDateElem.style.backgroundColor = "#d1ecf1"; // Mantener el color del día actual después de hacer clic
        //     }
        // },

//         onClose: [function(){
//             setTimeout(function(){
//                 calendar.open();
//             }, 1);
//         }]
//     });

//     calendar.open();

// }); // Lógica con Flatpickr.js

document.addEventListener("DOMContentLoaded", function() {
    const calendarContainer = document.getElementById("calendarContainer");
    const infoContainer = document.getElementById("infoContainer");

    // Función para abrir el calendario
    function openCalendar() {
        calendar.open();
    }

    // Inicializamos Flatpickr en el contenedor fijo
    const calendar = flatpickr(calendarContainer, {
        enableTime: true,
        dateFormat: "d/m/Y // H:i",
        minDate: "today",
        disable: [{ from: "today", to: "today" }],
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
                longhand: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
            },
            months: {
                shorthand: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                longhand: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
            }
        },

        onMonthChange: function(selectedDates, dateStr, instance) {
            // Deshabilitar los días del siguiente mes
            const nextMonth = new Date(selectedDates[0]);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
    
            const nextMonthDays = Array.from(instance.calendarContainer.querySelectorAll(".flatpickr-day.nextMonth"));
            nextMonthDays.forEach(day => {
                const dayDate = new Date(day.dateObj);
                if (dayDate.getMonth() === nextMonth.getMonth()) {
                    day.classList.add("disabled");
                } else {
                    day.classList.remove("disabled");
                }
            });
        },

        onReady: function(selectedDates, dateStr, instance) {
            const monthDropdown = instance.calendarContainer.querySelector(".flatpickr-monthDropdown-months");
            const yearDropdown = instance.calendarContainer.querySelector(".flatpickr-yearDropdown-years");
            const currentDateElem = instance.calendarContainer.querySelector(".today");

            instance.calendarContainer.querySelector(".flatpickr-monthDropdown-months").style.width = "50%";

            if (currentDateElem) {
                currentDateElem.style.backgroundColor = "#d1ecf1";
                currentDateElem.style.borderRadius = "50%";
                currentDateElem.style.pointerEvents = "none";
                currentDateElem.style.border = "2px solid #007bff";
            }
        },

        onChange: function(selectedDates, dateStr, instance) {
            // Dividir la fecha y la hora
            const parts = dateStr.split(" // ");
            const selectedDay = parts[0];
            const selectedTime = parts[1];

            // Mostrar el día seleccionado en una línea y la hora seleccionada en otra
            infoContainer.innerHTML = "<p>Día seleccionado: " + selectedDay + "</p><p>Hora seleccionada: " + selectedTime + "</p>";
            
            // Mostrar día actual
            const currentDateElem = instance.calendarContainer.querySelector(".today");
            if (currentDateElem) {
                currentDateElem.style.backgroundColor = "#d1ecf1"; // Mantener el color del día actual después de hacer clic
                currentDateElem.style.borderRadius = "50%";
                currentDateElem.style.border = "2px solid #007bff";
            }
        },
        onClose: function() {
            // Volver a abrir el calendario cada vez que se cierre
            openCalendar();
        }
    });

    // Abrimos el calendario automáticamente después de inicializarlo
    openCalendar();
});

// Texto disabled formulario contacto

document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll("input, textarea");
    const form = document.querySelector(".formulario");

    let placeholders = [];

    inputs.forEach((input, index) => {
        placeholders.push(input.getAttribute("placeholder"));

        input.addEventListener("click", () => {
            input.placeholder = "";
        });
    
        // Cuando se pierda el foco, si sigue vacío, restablecer placeholder -> No funciona
        input.addEventListener("blur", () => {
            if (input.value === "") {
                input.placeholder = placeholders[index];
            }
        });
    });

    // Con un solo click se desactivan todos los placeholder
    // inputs.forEach(input => {
    //     input.addEventListener("click", () => {
    //         inputs.forEach(input => {
    //             input.placeholder = "";
    //         });
    //     });
    // });
});

// Validaciones formulario contacto

// document.addEventListener("DOMContentLoaded", function() {
//     const form = document.querySelector(".formulario");
//     const buttonform = document.querySelector(".buttonform");
//     const requiredInputs = document.querySelectorAll("input[required], textarea[required], select[required]");

//     requiredInputs.forEach(input => {
//         const fieldform = input.closest(".fieldform");
//         const errorText = fieldform.querySelector(".errormessageform");

//         input.addEventListener("blur", () => {
//             if(input.value.trim() === "") {
//                 errorText.style.display = "block";
//                 fieldform.classList.add("error");
//             } else {
//                 errorText.style.display = "none";
//                 fieldform.classList.remove("error");
//             };
//         });
        
//         input.addEventListener("keyup", () => {
//             if(input.value.trim() === "") {
//                 errorText.style.display = "block";
//                 fieldform.classList.add("error");
//             } else {
//                 errorText.style.display = "none";
//                 fieldform.classList.remove("error");
//             };
//         });

//         buttonform.addEventListener("click", () => {
//             if(input.value.trim() === "") {
//                 errorText.style.display = "block";
//                 fieldform.classList.add("error");
//             } else {
//                 errorText.style.display = "none";
//                 fieldform.classList.remove("error");
//             };
//         });
//     });

//     form.addEventListener("submit", (event) => {
//         event.preventDefault();
//         requiredInputs.forEach(input => {
//             const fieldform = input.closest(".fieldform");
//             const errorText = fieldform.querySelector(".errormessageform");
    
//             if(!fieldform.classList.contains("error")) {
//                 form.submit();
//             };
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".formulario");
    const buttonform = document.querySelector(".buttonform");
    const requiredInputs = document.querySelectorAll("input[required], textarea[required], select[required]");

    // Función para validar un campo y mostrar el mensaje de error si es necesario
    function validateField(input) {
        const fieldform = input.closest(".fieldform");
        const errorText = fieldform.querySelector(".errormessageform");

        if (input.value.trim() === "") {
            errorText.style.display = "block";
            fieldform.classList.add("error");
            return false;
        } else {
            errorText.style.display = "none";
            fieldform.classList.remove("error");
            return true;
        }
    }

    // Función para validar una dirección de correo electrónico
    function validateEmail(input) {
        const email = input.value.trim();
        const emailinvalid = input.closest(".fieldform").querySelector(".emailinvalid");

        // Expresión regular para validar una dirección de correo electrónico
        const emailPattern = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9_-]+)\.([a-zA-Z]{2,6})(\.[a-zA-Z]{2,6})?$/;

        // Validar la dirección de correo electrónico
        if (email !== "" && !emailPattern.test(email)) {
            input.closest(".fieldform").classList.add("error");
            emailinvalid.style.display = "block";
        } else {
            input.closest(".fieldform").classList.remove("error");
            emailinvalid.style.display = "none";
        }
    }

    // Configurar eventos de validación para cada campo requerido
    requiredInputs.forEach(input => {
        input.addEventListener("input", () => {
            validateField(input);
            if (input.type === "email" && input.value !== "" ) {
                validateEmail(input);
            } else {
                validateField(input);
            }
        });

        // También mantén los eventos "blur" y "keyup" para la validación del campo
        // input.addEventListener("blur", () => {
        //     validateField(input);
        //     if (input.type === "email" && input.value.trim() !== "") {
        //         validateEmail(input);
        //     }
        // });

        // input.addEventListener("keyup", () => {
        //     if (input.type !== "email") {
        //         validateField(input);
            // } else {
            //     // Validar el campo de correo electrónico solo si no está vacío
            //     if (input.value.trim() !== "") {
            //         validateEmail(input);
            //     } else {
            //         // Si el campo de correo electrónico está vacío, solo validar el campo normalmente
            //         validateField(input);
            //     }
        //     }
        // });
    });

    // Manejar el click del botón de envío del formulario
    buttonform.addEventListener("click", () => {
        let isValid = true;

        // Validar todos los campos antes de enviar el formulario
        requiredInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
            if (input.type === "email") {
                validateEmail(input);
            }
            // Asegúrate de que el checkbox esté marcado (si existe)
            if (input.type === "checkbox" && !input.checked) {
                isValid = false;
            }
        });

        // Envía el formulario si todos los campos están validados correctamente
        if (isValid) {
            form.submit();
        }
    });

    // Manejar el evento de envío del formulario
    form.addEventListener("submit", (event) => {
        // Evitar el envío predeterminado del formulario
        event.preventDefault();
        // La validación se ha realizado anteriormente en el evento del botón de envío
        // No es necesario validar nuevamente aquí
        // El formulario solo se enviará si todos los campos están validados correctamente
    });
});

// Enviar formulario contacto

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.formulario');
    const success = document.querySelector('.successform');
    const fail = document.querySelector('.failform');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                form.style.display = 'none';
                success.style.display = 'block';
                setTimeout(() => {
                    resetForm();
                }, 3000); // 3000 milliseconds = 3 seconds
            } else {
                form.style.display = 'none';
                fail.style.display = 'block';
                setTimeout(() => {
                    resetForm();
                }, 3000); // 3000 milliseconds = 3 seconds
            }
        })
        .catch(error => {
            console.log(error);
            form.style.display = 'none';
            fail.style.display = 'block';
            setTimeout(() => {
                resetForm();
            }, 3000); // 3000 milliseconds = 3 seconds
        });
    });

    function resetForm() {
        form.style.display = 'block';
        success.style.display = 'none';
        fail.style.display = 'none';
        form.reset(); // Si decides usar form.reset(), deberías ocultar y mostrar los elementos después de un breve retraso para evitar la pérdida de estilos
    }
});

// Marcar activo los + de accesorios

document.addEventListener("DOMContentLoaded", function() {
    const adding = document.querySelectorAll(".addaccessory");
    const checker = document.querySelectorAll(".checkaccessory");

    adding.forEach((add, index) => {
        add.addEventListener("click", () => {
            const textAccessory = add.parentElement.parentElement.querySelector(".textaccessory"); // Encuentra el campo de texto accesorio relacionado
            if (add.classList.contains("active")) {
                add.classList.remove("active");
                textAccessory.classList.remove("active");
            } else {
                add.classList.add("active");
                checker[index].classList.add("active");
                textAccessory.classList.add("active");
            }
        });
    });

    checker.forEach((check, index) => {
        check.addEventListener("click", () => {
            const textAccessory = check.parentElement.parentElement.querySelector(".textaccessory"); // Encuentra el campo de texto accesorio relacionado
            if (check.classList.contains("active")) {
                check.classList.remove("active");
                adding[index].classList.remove("active");
                textAccessory.classList.remove("active");
            }
        });
    });
});

// Marcar activo el buscador de productos

document.addEventListener("DOMContentLoaded", function() {
    const search = document.querySelector(".search");
    const searchinput = document.querySelector(".searchinput");
    
    let originalPlaceholder = searchinput.getAttribute("placeholder");

    search.addEventListener("click", (event) => {
        search.classList.add("active");
        searchinput.placeholder = "";
        event.stopPropagation();
    });
    
    document.addEventListener("click", function(event) {
        if(!search.contains(event.target)) {
            search.classList.remove("active");
            searchinput.placeholder = originalPlaceholder;
        }
    });
});

// Buscar producto

document.addEventListener("DOMContentLoaded", function() {
    const searchinput = document.querySelector(".searchinput");
    const searchbutton = document.querySelector(".searchbutton");
    const products = document.querySelectorAll(".product");
    const featuredSections = document.querySelectorAll("#featured");

    // Ocultar apartados de productos si ninguno está visible
    function ocultarFeatured() {
        featuredSections.forEach(featuredSection => {
            const productsContainer = featuredSection.querySelector(".product-container");
            const products = productsContainer.querySelectorAll(".product");

            let algunoVisible = false;

            products.forEach(product => {
                if (product.style.display !== "none") {
                    algunoVisible = true;
                }
            });

            if (!algunoVisible) {
                featuredSection.style.display = "none";
            } else {
                featuredSection.style.display = "block";
            }
        });
    };

    // Lógica de buscador aplicando la lógica a distintos eventos
    searchinput.addEventListener("input", function() {
        searchProduct();
    });

    searchinput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            searchProduct();
        }
    });
    
    searchbutton.addEventListener("click", () => {
        searchProduct();
    });
    
    // Lógica de buscador
    function searchProduct() {
        const searchinputvalue = searchinput.value.toLowerCase().trim();

        products.forEach(product => {
            const productName = product.querySelector(".description h5").innerText.toLowerCase().trim();

            if(searchinputvalue === "" || productName.includes(searchinputvalue)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

            ocultarFeatured();
        });
    };
});

// Lógica y activación de filtros de productos

document.addEventListener("DOMContentLoaded", function() {
    const filters = document.querySelectorAll(".filter");
    const blockfiltersinvisibles = document.querySelector(".filtersinvisible");
    const filtersinvisibles = document.querySelectorAll(".filtersinvisible .filter");
    const products = document.querySelectorAll(".product");
    const filtermenu = document.querySelector(".filtermenu");
    const featuredSections = document.querySelectorAll("#featured");

    // Ocultar apartados de productos si ninguno está visible
    function ocultarFeatured() {
        featuredSections.forEach(featuredSection => {
            const productsContainer = featuredSection.querySelector(".product-container");
            const products = productsContainer.querySelectorAll(".product");

            let algunoVisible = false;

            products.forEach(product => {
                if (product.style.display !== "none") {
                    algunoVisible = true;
                }
            });

            if (!algunoVisible) {
                featuredSection.style.display = "none";
            } else {
                featuredSection.style.display = "block";
            }
        });
    };

    // Lógica de filtros
    filters.forEach((filter) => {

        filter.addEventListener("click", () => {
            if(filter !== filtermenu) {
                const filterValue = filter.innerText.toLowerCase().trim();
                const isActive = filter.classList.toggle("active");

                products.forEach((product) => {
                    const tags = product.querySelectorAll(".tag");
                    let matchFound = false;

                    tags.forEach((tag) => {
                        if (tag.innerText.toLowerCase().includes(filterValue)) {
                            matchFound = true;
                        }
                    });

                    if (isActive) {
                        if (matchFound) {
                            product.style.display = "block";
                        } else {
                            product.style.display = "none";
                        }
                    } else {
                        product.style.display = "block";
                    }
                    // if (matchFound) {
                    //     product.style.display = isActive ? "block" : "none";
                    // }
                });
            } else {
                if (filter.classList.contains("active")) {
                    filter.classList.remove("active");
                    blockfiltersinvisibles.style.display = "none";

                } else {
                    filter.classList.add("active");
                    blockfiltersinvisibles.style.display = "block";
                }
            };
            ocultarFeatured();
        });
    });
});

// Suscribirse a newsletter

// document.addEventListener("DOMContentLoaded", function() {
//     const success = document.querySelector(".successnewsletter");
//     const subscribe = document.querySelector(".subscribe");
//     // const scriptURL = "https://script.google.com/macros/s/AKfycbzKgieCV5iDypdZ19Iv9twef6wlzpbSCO0uJtWHCFhX-FBc5twwTaHDvhdtGQ4hxBmS/exec"
//     // const form = document.querySelector(".newsletterbutton");

//     // form.addEventListener('submit', e => {
//     //     e.preventDefault()
//     //     fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//     //     .then(response => console.log('Success!', response))
//     //     .catch(error => console.error('Error!', error.message))
//     // })

//     subscribe.addEventListener("click", () => {
//         success.style.display = "block"
//         setTimeout(function() {
//             success.style.display = "none";
//         }, 80000); //8 segundos, que son 8.000 milisegundos
//     });
// });

// Desplegable Header

document.addEventListener("DOMContentLoaded", function() {
    const navbarItems = document.querySelectorAll(".navbaritem");

    navbarItems.forEach(navbarItem => {
        navbarItem.addEventListener("mouseenter", () => {
            const headerdesplegable = navbarItem.parentNode.querySelector('.headerdesplegable');
            if (headerdesplegable) {
                headerdesplegable.style.display = "block";
                const arrowheader = navbarItem.parentNode.querySelector('.arrowheader');
                if (arrowheader) {
                    arrowheader.style.transform = "rotate(180deg)";
                };
            };
        });

        navbarItem.addEventListener("mouseleave", () => {
            const headerdesplegable = navbarItem.parentNode.querySelector('.headerdesplegable');
            if (headerdesplegable) {
                headerdesplegable.style.display = "none";
                const arrowheader = navbarItem.parentNode.querySelector('.arrowheader');
                if (arrowheader) {
                    arrowheader.style.transform = "rotate(0deg)";
                };
            };
        });
    });

    const headerdesplegables = document.querySelectorAll('.headerdesplegable');
    headerdesplegables.forEach(headerdesplegable => {
        headerdesplegable.addEventListener("mouseenter", () => {
            headerdesplegable.style.display = "block";
        });
        headerdesplegable.addEventListener("mouseleave", () => {
            headerdesplegable.style.display = "none";
        });
    });
});

// Completar datos checkout

document.addEventListener("DOMContentLoaded", function() {
    const checkoutInputs = document.querySelectorAll(".checkoutformulario .fieldform input");
    const checkoutdataclient = document.querySelector(".checkoutdataclient");

    // Función para actualizar los datos mostrados en checkoutdataclient
    function updateCheckoutData() {
        let html = "<h6>Datos de contacto</h6>";
        checkoutInputs.forEach(input => {
            const inputValue = input.value.trim();
            if(inputValue !== "") {
                const label = input.parentElement.querySelector("label").innerText.trim().replace(/\*|\(opcional\)/g, '');;
                html += "<p>" + label + ": " + inputValue + "</p>";
            }
        });
        checkoutdataclient.innerHTML = html;
    }

    // Actualizar los datos al cargar la página
    updateCheckoutData();

    // Escuchar el evento keyup en cada campo del formulario
    checkoutInputs.forEach(input => {
        input.addEventListener("keyup", updateCheckoutData);
        input.addEventListener("blur", updateCheckoutData);
    });
});

// Enviar datos URL Home/Pasteles/Postres - Product specific

document.addEventListener("DOMContentLoaded", function() {
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        function sendURL () {
            const productName = product.querySelector(".description h5");
            const productPrice = product.querySelector(".description .product-price-save-pay h4");
            const productDescription = product.querySelector(".description .productdescription p");
            const productIngredients = product.querySelectorAll(".description .descriptiontoggle .ingredientesLista li");
            const productAlérgenos = product.querySelectorAll(".description .descriptiontoggle .alérgenosLista li");
            const productPersonalización = product.querySelectorAll(".description .descriptiontoggle .personalizaciónLista li");
            const productIngredientsSummary = product.querySelector(".description .descriptiontoggle .ingredientes");
            const productAlérgenosSummary = product.querySelector(".description .descriptiontoggle .alérgenos");
            const productPersonalizaciónSummary = product.querySelector(".description .descriptiontoggle .personalización");
            const productImg1 = product.querySelector(".productsupportimages .img1");
            const productImg2 = product.querySelector(".productsupportimages .img2");
            const productImg3 = product.querySelector(".productsupportimages .img3");
            const productImg4 = product.querySelector(".productsupportimages .img4");

            const producto = productName.textContent;
            const precio = productPrice.textContent;
            const descripción = productDescription.innerHTML;
            const ingredientes = Array.from(productIngredients).map(item => item.textContent).join('-');
            const alérgenos = Array.from(productAlérgenos).map(item => item.textContent).join('-');
            const personalización = Array.from(productPersonalización).map(item => item.textContent).join('-');
            const ingredientesSummary = productIngredientsSummary.textContent;
            const alérgenosSummary = productAlérgenosSummary.textContent;
            const personalizaciónSummary = productPersonalizaciónSummary.textContent;
            const img1 = productImg1.getAttribute("src");
            const img2 = productImg2.getAttribute("src");
            const img3 = productImg3.getAttribute("src");
            const img4 = productImg4.getAttribute("src");
            
            const url = `product.html?producto=${encodeURIComponent(producto)}&precio=${encodeURIComponent(precio)}&descripción=${encodeURIComponent(descripción)}&ingredientes=${encodeURIComponent(ingredientes)}&alérgenos=${encodeURIComponent(alérgenos)}&personalización=${encodeURIComponent(personalización)}&ingredientesSummary=${encodeURIComponent(ingredientesSummary)}&alérgenosSummary=${encodeURIComponent(alérgenosSummary)}&personalizaciónSummary=${encodeURIComponent(personalizaciónSummary)}&img1=${encodeURIComponent(img1)}&img2=${encodeURIComponent(img2)}&img3=${encodeURIComponent(img3)}&img4=${encodeURIComponent(img4)}`;
        
            window.location.href = url;
        }
        
        const cart = product.querySelector(".cart");
        cart.addEventListener('click', sendURL);
        // product.addEventListener("click", sendURL);
    });
});

// Receptor datos URL Home/Pasteles/Postres - Product specific

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const producto = decodeURIComponent(params.get('producto'));
    const precio = decodeURIComponent(params.get('precio'));
    const descripción = decodeURIComponent(params.get('descripción'));
    const ingredientes = decodeURIComponent(params.get('ingredientes')).split('-').join('</li><li>');
    const alérgenos = decodeURIComponent(params.get('alérgenos')).split('-').join('</li><li>');
    const personalización = decodeURIComponent(params.get('personalización')).split('-').join('</li><li>');
    const ingredientesSummary = decodeURIComponent(params.get('ingredientesSummary'));
    const alérgenosSummary = decodeURIComponent(params.get('alérgenosSummary'));
    const personalizaciónSummary = decodeURIComponent(params.get('personalizaciónSummary'));
    const img1 = decodeURIComponent(params.get('img1'));
    const img2 = decodeURIComponent(params.get('img2'));
    const img3 = decodeURIComponent(params.get('img3'));
    const img4 = decodeURIComponent(params.get('img4'));

    // Mostrar los detalles del producto en la página
    document.querySelector(".description h2").textContent = producto;
    document.querySelector(".description .productsintro p").innerHTML = descripción;
    document.querySelector(".description .productstoggle .ingredientes").textContent = ingredientesSummary;
    document.querySelector(".description .productstoggle .alérgenos").textContent = alérgenosSummary;
    document.querySelector(".description .productstoggle .personalización").textContent = personalizaciónSummary;
    document.querySelector(".description .productstoggle .ingredientesLista").innerHTML = `<li>${ingredientes}</li>`;
    document.querySelector(".description .productstoggle .alérgenosLista").innerHTML = `<li>${alérgenos}</li>`;
    document.querySelector(".description .productstoggle .personalizaciónLista").innerHTML = `<li>${personalización}</li>`;
    document.querySelector(".description .productspricing h6").textContent = precio;
    document.querySelector(".productsupportimages .img1").setAttribute("src", img1);
    document.querySelector(".productsupportimages .img2").setAttribute("src", img2);
    document.querySelector(".productsupportimages .img3").setAttribute("src", img3);
    document.querySelector(".productsupportimages .img4").setAttribute("src", img4);

});

// Enviar datos URL Product specific - Checkout

document.addEventListener("DOMContentLoaded", function() {
    const productspecific = document.querySelector(".products .description");
    const accessoriesContent = document.querySelector(".accessoriescontent");

    function sendURLcheckbox () {
        const productName = productspecific.querySelector(".description h2");
        const productPrice = productspecific.querySelector(".description .productspricing h6");
        const productSize = productspecific.querySelector(".description .productssizebuttons button.active");
        const productDelivery = productspecific.querySelector(".description .productsdeliverybuttons button.active");
        
        // Verificar si las velas están activas
        const productVelasActive = accessoriesContent.querySelector(".velas .addaccessory").classList.contains('active');
        let productVelasNumero = "";
        if (productVelasActive) {
            productVelasNumero = accessoriesContent.querySelector(".velas .numerovelas").value;
        }
    
        // Verificar si el mensaje está activo
        const productMensajeActive = accessoriesContent.querySelector(".mensaje .addaccessory").classList.contains('active');
        let productMensajeTexto = "";
        if (productMensajeActive) {
            productMensajeTexto = accessoriesContent.querySelector(".mensaje .mensajepersonalizado").value;
        }

        const producto = productName.textContent;
        const precio = productPrice.textContent;
        const tamaño = productSize.textContent; 
        const entrega = productDelivery.textContent;
        
        // Construir la URL
        const urlParams = new URLSearchParams();
        urlParams.append('producto', producto);
        urlParams.append('precio', precio);
        urlParams.append('tamaño', tamaño);
        urlParams.append('entrega', entrega);
        if (productVelasActive) {
            urlParams.append('númerovelas', productVelasNumero);
        }
        if (productMensajeActive) {
            urlParams.append('mensajepersonalizado', productMensajeTexto);
        }
        
        const url = `checkout.html?${urlParams.toString()}`;
    
        window.location.href = url;
    };

    const buynow = document.querySelector(".buynow");
    buynow.addEventListener("click", sendURLcheckbox);
});

// Receptor datos URL Product specific - Checkout

document.addEventListener("DOMContentLoaded", function() {
    const productoaccesoriovela = document.querySelector(".productoaccesoriovela");
    const productoaccesoriomensaje = document.querySelector(".productoaccesoriomensaje");

    const params = new URLSearchParams(window.location.search);
    const producto = decodeURIComponent(params.get('producto'));
    const precio = decodeURIComponent(params.get('precio'));
    const tamaño = decodeURIComponent(params.get('tamaño'));
    const entrega = decodeURIComponent(params.get('entrega'));
    const númerovelas = decodeURIComponent(params.get('númerovelas'));
    const mensajepersonalizado = decodeURIComponent(params.get('mensajepersonalizado'));


    // Mostrar los detalles del producto en la página
    document.querySelector(".checkoutproduct .nombreProducto").textContent = producto;
    document.querySelector(".checkoutsize p").textContent = tamaño;
    document.querySelector(".checkoutproduct .productoPrecio").textContent = precio;
    document.querySelector(".checkoutdelivery p").textContent = entrega;
    document.querySelector(".productoaccesoriovela .nombreAccesorio .textoAccesorio").textContent = númerovelas;
    document.querySelector(".productoaccesoriomensaje .nombreAccesorio .textoAccesorio").textContent = mensajepersonalizado;

    let velaActiva = false;
    let mensajeActivo = false;
    
    if (params.has("númerovelas")) {
        if (númerovelas !== null && númerovelas.trim() !== "") {
            productoaccesoriovela.style.display = "flex";
            velaActiva = true;
        }
    };
    
    if (params.has("mensajepersonalizado")) {
        if (mensajepersonalizado !== null && mensajepersonalizado.trim() !== "") {
            productoaccesoriomensaje.style.display = "flex";
            mensajeActivo = true;
        }
    };
    
    function totalSum() {
        let precioBase = parseFloat(precio); // Convertir el precio base a número
        let precioTotal = precioBase; // Precio total inicialmente igual al precio base
        
        // Ocultar el precio base (si es necesario)
        // precioTotal.style.display = "none"; // Esto no es necesario porque precioTotal es una variable numérica, no un elemento del DOM
        
        // Sumar el precio de las velas si están activas
        if (velaActiva) {
            precioTotal += 4;
        }
    
        // Sumar el precio del mensaje si está activo
        if (mensajeActivo) {
            precioTotal += 4;
        }
    
        // Mostrar nuevamente el precio base (si es necesario)
        // precioTotal.style.display = "block"; // Esto tampoco es necesario
    
        return precioTotal; // Devolver el precio total calculado
    }
    
    // Llamar a la función totalSum() para obtener el precio total y asignarlo al elemento de la interfaz
    document.querySelector(".productpricing .pricingtotalvalue").textContent = totalSum();
    

});

// Enviar mail con el checkout

document.addEventListener("DOMContentLoaded", function() {
    const submitcheckout = document.querySelector(".submitcheckout");
    const checkoutdescription = document.querySelector(".checkoutdescription");
    const failformcheckout = document.querySelector(".failformcheckout");
    const successformcheckout = document.querySelector(".successformcheckout");

    submitcheckout.addEventListener("click", () => {
        fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer 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',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              personalizations: [
                {
                  to: [{ email: 'albert.arusg@outlook.com' }],
                  subject: 'Resumen del pedido'
                }
              ],
              from: { email: 'albert.arusg@gmail.com' },
              content: [
                {
                  type: 'text/plain',
                  value: 'Este es un correo de prueba enviado desde SendGrid.'
                }
              ]
            })
          })
          .then(response => {
            if (response.ok) {
              checkoutdescription.style.display = "none";
              successformcheckout.style.display = "block";
            } else {
                checkoutdescription.style.display = "none";
                failformcheckout.style.display = "block";
              }
          })
          .catch(error => {
            checkoutdescription.style.display = "none";
            failformcheckout.style.display = "block";
        });
    });
});



