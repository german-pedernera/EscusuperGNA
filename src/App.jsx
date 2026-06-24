import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isIntegrantesHovered, setIsIntegrantesHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-up');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.85) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const evidenciasData = [
  {
    id: 1,
    title: 'Biografía Escolar y Concepciones sobre la Evaluación',
    presentacion: 'La biografía escolar fue una de las primeras actividades desarrolladas durante la cursada. Su propósito consistió en recuperar experiencias personales vinculadas con la escolaridad para reflexionar sobre cómo estas influyeron en nuestras concepciones acerca de la enseñanza, el aprendizaje y la evaluación.',
    origen: 'Elegimos esta evidencia porque representa el punto de partida de nuestro recorrido formativo. Nos permitió identificar las ideas previas con las que iniciamos la cursada y reconocer cómo nuestras experiencias escolares habían influido en la construcción de nuestras concepciones sobre la evaluación. Esta producción evidencia nuestras concepciones iniciales y permite observar el comienzo del proceso de transformación conceptual que se desarrolló a lo largo de la materia. Constituye una referencia fundamental para comprender la evolución posterior de nuestras ideas.',
    concepto: 'Aparecen principalmente concepciones tradicionales de evaluación vinculadas con la acreditación de conocimientos, la calificación y la medición de resultados. Asimismo, comienzan a surgir interrogantes sobre el verdadero sentido de evaluar y sobre el papel que cumple la evaluación dentro de los procesos educativos.',
    dialogo: 'Esta evidencia dialoga con los enfoques desarrollados por Anijovich y Cappelletti, quienes plantean la necesidad de superar las perspectivas reduccionistas de la evaluación para comprenderla como una práctica reflexiva y orientada al aprendizaje. También se relaciona con las discusiones desarrolladas durante la cursada sobre la evaluación como comprensión y sobre la importancia de analizar críticamente nuestras propias experiencias educativas.',
    evolucion: 'A partir de esta actividad comenzamos a reconocer que muchas de nuestras concepciones sobre la evaluación estaban fuertemente influenciadas por experiencias escolares centradas en la calificación y el control. Posteriormente comprendimos que la evaluación constituye una herramienta mucho más amplia, orientada a comprender procesos, reconocer avances y favorecer aprendizajes significativos.',
    icon: '📚'
  },
  {
    id: 2,
    title: 'De la Evaluación Tradicional a la Evaluación Multirreferencial',
    presentacion: 'Esta producción consistió en el análisis crítico de diferentes modalidades de evaluación, identificando sus características, limitaciones y posibilidades de mejora desde una perspectiva multirreferencial.',
    origen: 'Elegimos esta evidencia porque representó uno de los momentos de mayor transformación conceptual durante la cursada. Nos permitió cuestionar nuestras ideas previas y analizar la evaluación desde una perspectiva más amplia e integral. Muestra la transición desde una mirada centrada en los resultados hacia una comprensión de la evaluación como un proceso complejo que involucra múltiples dimensiones del aprendizaje.',
    concepto: 'Aparecen conceptos vinculados con: Evaluación formativa, Evaluación multirreferencial, Retroalimentación, Metacognición, Diversidad de trayectorias, Evaluación como proceso continuo. La evidencia plantea la necesidad de superar modelos centrados exclusivamente en la acreditación de conocimientos.',
    dialogo: 'Se relaciona con los aportes de Anijovich y Cappelletti acerca de la evaluación como herramienta para comprender y mejorar los procesos de aprendizaje. Asimismo, recupera las discusiones desarrolladas en torno a la evaluación multirreferencial y la necesidad de considerar aspectos cognitivos, sociales, emocionales e institucionales.',
    evolucion: 'Comprendimos que evaluar implica mucho más que medir conocimientos. Aprendimos que una evaluación significativa debe contemplar los procesos, los contextos y las trayectorias de los estudiantes.',
    icon: '🔄'
  },
  {
    id: 3,
    title: 'Análisis de la película "La Ola" (Die Welle)',
    presentacion: 'El análisis de la película permitió reflexionar sobre las relaciones de poder, la construcción de normas, la influencia de los grupos y el papel de las instituciones educativas en la formación de los sujetos.',
    origen: 'Elegimos esta evidencia porque nos permitió desarrollar una mirada crítica sobre fenómenos complejos relacionados con la educación, la autoridad y la participación. Muestra nuestra capacidad para relacionar situaciones concretas con conceptos teóricos trabajados durante la cursada y para analizar críticamente diferentes problemáticas educativas.',
    concepto: 'Aparecen conceptos relacionados con: Evaluación como práctica social, Participación, Relaciones de poder, Construcción de normas, Perspectiva multirreferencial, Pensamiento crítico.',
    dialogo: 'La actividad dialoga con los enfoques que conciben la evaluación como una práctica contextualizada y atravesada por dimensiones sociales, culturales e institucionales. Asimismo, recupera la importancia de analizar los procesos educativos desde múltiples perspectivas y de promover la reflexión crítica.',
    evolucion: 'Comprendimos que las prácticas educativas y evaluativas nunca son neutrales y que siempre se encuentran influenciadas por relaciones de poder, normas y contextos específicos.',
    icon: '🎬'
  },
  {
    id: 4,
    title: 'Criterios de Evaluación: del criterio implícito al criterio compartido',
    presentacion: 'Durante la cursada trabajamos el concepto de criterios de evaluación y su importancia dentro de los procesos de enseñanza y aprendizaje. A partir de las lecturas, los foros y los intercambios realizados en clase, comprendimos que los criterios constituyen referencias fundamentales para orientar el trabajo de docentes y estudiantes.',
    origen: 'Elegimos esta evidencia porque fue uno de los temas que más modificó nuestra forma de comprender la evaluación. Hasta ese momento, considerábamos que la evaluación dependía principalmente del juicio del docente, sin reflexionar demasiado sobre la importancia de explicitar aquello que se espera de los estudiantes. Esta evidencia muestra cómo comenzamos a comprender la necesidad de construir procesos evaluativos más transparentes, donde los estudiantes conozcan previamente los criterios con los cuales serán valoradas sus producciones.',
    concepto: 'Aparecen conceptos vinculados con: Criterios de evaluación, Transparencia evaluativa, Evaluación formativa, Retroalimentación, Participación estudiantil, Construcción compartida del aprendizaje. Comprendimos que los criterios funcionan como un mapa que orienta el recorrido de aprendizaje y permite reconocer distintos niveles de logro.',
    dialogo: 'Esta evidencia dialoga especialmente con los aportes de Anijovich y Cappelletti, quienes destacan la importancia de explicitar criterios claros, relevantes y conocidos por los estudiantes. Asimismo, recupera las reflexiones desarrolladas durante los foros de la materia, donde se planteó que los criterios permiten establecer un diálogo entre docente y estudiante orientado a la mejora de los aprendizajes.',
    evolucion: 'Comprendimos que una evaluación justa no puede sostenerse sobre expectativas implícitas o desconocidas para los estudiantes. Actualmente entendemos que los criterios permiten orientar el aprendizaje, brindar mayor claridad sobre los objetivos y favorecer procesos de autoevaluación y mejora continua.',
    icon: '🎯'
  },
  {
    id: 5,
    title: 'Rúbricas y Evaluación Formativa',
    presentacion: 'A través de los aportes de Heidi Andrade analizamos el papel de las rúbricas como herramientas de evaluación capaces de orientar, acompañar y mejorar los procesos de aprendizaje. Este tema permitió integrar conceptos previamente trabajados durante la cursada y comprender la estrecha relación existente entre evaluación, enseñanza y aprendizaje.',
    origen: 'Elegimos esta evidencia porque sintetiza muchos de los aprendizajes construidos durante el cuatrimestre. Las rúbricas integran criterios de evaluación, retroalimentación, autoevaluación y participación activa de los estudiantes. Además, representan una herramienta concreta que podremos utilizar en nuestra futura práctica docente. Esta evidencia muestra cómo fuimos comprendiendo que los instrumentos de evaluación no sirven únicamente para calificar, sino también para enseñar, orientar y promover aprendizajes significativos.',
    concepto: 'Aparecen conceptos relacionados con: Rúbricas, Evaluación formativa, Retroalimentación, Autoevaluación, Coevaluación, Metacognición, Aprendizaje significativo. Comprendimos que las rúbricas permiten explicitar criterios, favorecer la reflexión sobre el propio trabajo y promover procesos de mejora continua.',
    dialogo: 'Esta evidencia dialoga principalmente con los aportes de Heidi Andrade, quien plantea que las rúbricas no sólo son instrumentos de evaluación, sino también herramientas de enseñanza. Asimismo, se relaciona con Anijovich y Cappelletti al recuperar la importancia de la evaluación formativa, la retroalimentación y la participación activa de los estudiantes en la construcción de sus aprendizajes.',
    evolucion: 'Antes de abordar esta temática entendíamos los instrumentos de evaluación principalmente como herramientas destinadas a asignar calificaciones. Actualmente comprendemos que las rúbricas favorecen la reflexión, la autonomía y la mejora continua, transformando la evaluación en una oportunidad para aprender.',
    icon: '📋'
  }
];

  const [selectedEvidencia, setSelectedEvidencia] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isModalSpeaking, setIsModalSpeaking] = useState(false);
  const [isNarrativeSpeaking, setIsNarrativeSpeaking] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [highlightLength, setHighlightLength] = useState(0);
  const [narrativeHighlightIndex, setNarrativeHighlightIndex] = useState(-1);
  const [narrativeHighlightLength, setNarrativeHighlightLength] = useState(0);
  const [isConclusionSpeaking, setIsConclusionSpeaking] = useState(false);
  const [conclusionHighlightIndex, setConclusionHighlightIndex] = useState(-1);
  const [conclusionHighlightLength, setConclusionHighlightLength] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);

  const showConfirm = (message, action) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setIsConfirmOpen(true);
  };

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [contactMessages, setContactMessages] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);

  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [showInstallModal, setShowInstallModal] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPromptEvent(e);
      const hasSeenPrompt = localStorage.getItem('hasSeenInstallPrompt');
      if (!hasSeenPrompt) {
        setTimeout(() => setShowInstallModal(true), 2000); // Show after 2 seconds
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPromptEvent) return;
    setShowInstallModal(false);
    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setInstallPromptEvent(null);
    localStorage.setItem('hasSeenInstallPrompt', 'true');
  };

  const handleDismissInstall = () => {
    setShowInstallModal(false);
    localStorage.setItem('hasSeenInstallPrompt', 'true');
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(collection(db, "contactMessages"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const msgs = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setContactMessages(msgs);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertOpen(true);
  };

  const handleUnifiedSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const foundInSite = window.find(searchQuery);
      if (!foundInSite) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
      }
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} a las ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} hs`;
    
    const newMessage = {
      ...data,
      date: formattedDate,
      timestamp: Date.now()
    };
    
    try {
      const docRef = await addDoc(collection(db, "contactMessages"), newMessage);
      const messageWithId = { ...newMessage, id: docRef.id };
      
      const updatedMessages = [messageWithId, ...contactMessages];
      setContactMessages(updatedMessages);
      
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
    } catch (err) {
      console.error("Error adding message: ", err);
    }
    
    setIsContactOpen(false);
    showAlert("¡Mensaje enviado con éxito!");
    form.reset();
  };

  const introParagraphs = [
    "El presente Portafolio de Aprendizaje tiene como finalidad reconstruir, analizar y reflexionar sobre el recorrido realizado durante la cursada de la asignatura Taller de Evaluación. Más que una recopilación de actividades desarrolladas a lo largo del cuatrimestre, este trabajo constituye una oportunidad para revisar críticamente nuestras experiencias de aprendizaje, identificar transformaciones conceptuales y reconocer aquellos saberes que resultaron más significativos para nuestra formación docente.",
    "Al iniciar la cursada, nuestras concepciones sobre la evaluación estaban principalmente asociadas a la acreditación de conocimientos, la medición de resultados y la asignación de calificaciones. Sin embargo, las lecturas, los debates, los foros y las actividades desarrolladas a lo largo de la materia nos permitieron ampliar progresivamente esa mirada y comprender la evaluación desde una perspectiva más integral, entendiéndola como una herramienta para comprender procesos, orientar la enseñanza y favorecer el aprendizaje.",
    "Las evidencias seleccionadas reflejan distintos momentos de ese recorrido y permiten observar cómo fueron evolucionando nuestras ideas acerca de la evaluación. A través de ellas recuperamos conceptos vinculados con la evaluación como comprensión, la evaluación formativa, la evaluación multirreferencial, los criterios de evaluación, las rúbricas y la importancia de la retroalimentación en los procesos educativos.",
    "En este sentido, el portafolio se convierte en una herramienta de reflexión que nos permite tomar conciencia de nuestro propio aprendizaje, identificar avances, reconocer desafíos y proyectar futuras prácticas docentes coherentes con una concepción de la evaluación orientada al acompañamiento, la mejora continua y el aprendizaje significativo.",
    "Somos un grupo integrado por: Raúl Dirie, Rubén Darío Pérez y Sergio Barrios, estudiantes del Profesorado Universitario."
  ];

  const paragraphOffsets = [];
  let currentOffset = 0;
  introParagraphs.forEach((p) => {
    paragraphOffsets.push({ start: currentOffset, end: currentOffset + p.length });
    currentOffset += p.length + 2;
  });

  const renderParagraph = (pText, index) => {
    const { start, end } = paragraphOffsets[index];
    if (highlightIndex >= start && highlightIndex < end) {
      const localStart = highlightIndex - start;
      const localLength = highlightLength;
      const before = pText.substring(0, localStart);
      const highlighted = pText.substring(localStart, localStart + localLength);
      const after = pText.substring(localStart + localLength);
      return (
        <>
          {before}
          <mark style={{ backgroundColor: 'var(--primary-orange)', color: 'white', borderRadius: '4px', padding: '0 2px' }}>{highlighted}</mark>
          {after}
        </>
      );
    }
    return pText;
  };

  const playIntroAudio = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setHighlightIndex(-1);
        return;
      }
      
      const textToRead = introParagraphs.join("\n\n");

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'es-ES';
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          setHighlightIndex(event.charIndex);
          setHighlightLength(event.charLength);
        }
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setHighlightIndex(-1);
      };
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      showAlert("Lo siento, tu navegador no soporta la lectura de texto en voz alta.");
    }
  };

  const playModalAudio = () => {
    if ('speechSynthesis' in window) {
      if (isModalSpeaking) {
        window.speechSynthesis.cancel();
        setIsModalSpeaking(false);
        return;
      }
      
      if (!selectedEvidencia) return;

      const textToRead = `${selectedEvidencia.title}. 
        Presentación de la evidencia: ${selectedEvidencia.presentacion}. 
        Origen: ${selectedEvidencia.origen}. 
        Concepto: ${selectedEvidencia.concepto}. 
        Diálogo: ${selectedEvidencia.dialogo}. 
        Evolución: ${selectedEvidencia.evolucion}.`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'es-ES';
      utterance.onend = () => setIsModalSpeaking(false);
      
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      setIsSpeaking(false);
      setHighlightIndex(-1);
      
      window.speechSynthesis.speak(utterance);
      setIsModalSpeaking(true);
    } else {
      showAlert("Lo siento, tu navegador no soporta la lectura de texto en voz alta.");
    }
  };

  const closeModal = () => {
    setSelectedEvidencia(null);
    if (isModalSpeaking) {
      window.speechSynthesis.cancel();
      setIsModalSpeaking(false);
    }
  };

  const narrativeParagraphs = [
    "Al comenzar la cursada de Taller de Evaluación, nuestra concepción sobre la evaluación estaba principalmente asociada a la acreditación de conocimientos y a la asignación de calificaciones. Entendíamos la evaluación como una instancia destinada a verificar aprendizajes y medir resultados obtenidos al finalizar un proceso de enseñanza. Si bien reconocíamos su importancia dentro del ámbito educativo, nuestra mirada se encontraba fuertemente vinculada a experiencias escolares en las que predominaban los exámenes, las notas y la certificación de saberes.",
    "A medida que avanzamos en la cursada, las lecturas, los debates, los foros y las actividades desarrolladas comenzaron a cuestionar esas concepciones iniciales. Uno de los primeros aprendizajes significativos surgió a partir de la reflexión sobre nuestras propias trayectorias educativas, donde pudimos reconocer que muchas de nuestras ideas sobre la evaluación eran producto de experiencias previas naturalizadas y pocas veces analizadas críticamente.",
    "Posteriormente, el abordaje de la evaluación como comprensión y de la evaluación formativa nos permitió ampliar nuestra mirada. Comenzamos a comprender que evaluar no implica únicamente medir resultados, sino también interpretar procesos, reconocer avances, identificar dificultades y generar oportunidades de mejora. Esta nueva perspectiva nos llevó a entender que la evaluación forma parte del proceso de enseñanza y aprendizaje y que su principal función consiste en contribuir al crecimiento de los estudiantes y a la mejora de las prácticas docentes.",
    "Otro aprendizaje significativo estuvo relacionado con la evaluación multirreferencial. Esta perspectiva nos permitió comprender que los procesos de aprendizaje son complejos y que no pueden ser analizados exclusivamente desde una dimensión cognitiva. Aprendimos a considerar la influencia de los contextos, las trayectorias, las experiencias, los aspectos emocionales, sociales e institucionales que intervienen en toda situación educativa. Esta mirada amplió considerablemente nuestra comprensión acerca del sentido y alcance de la evaluación.",
    "Asimismo, el estudio de los criterios de evaluación y de las rúbricas constituyó un aporte fundamental para nuestra formación. Comprendimos la importancia de explicitar las expectativas de aprendizaje, construir criterios claros y compartidos y generar procesos de retroalimentación que permitan a los estudiantes participar activamente en la mejora de sus producciones. Los aportes de Anijovich, Cappelletti y Andrade fortalecieron nuestra comprensión acerca de la evaluación como una práctica orientada al aprendizaje, la reflexión y la autonomía.",
    "Entre las ideas que mantuvimos a lo largo de la cursada podemos mencionar la convicción de que la evaluación constituye una dimensión indispensable de la enseñanza. Sin embargo, lo que cambió profundamente fue nuestra manera de entender su finalidad. Inicialmente la concebíamos principalmente como una herramienta de control y acreditación; actualmente la entendemos como una práctica pedagógica destinada a comprender procesos, acompañar trayectorias, favorecer la reflexión y promover aprendizajes significativos.",
    "Finalmente, esta cursada también dejó abiertos nuevos interrogantes y desafíos para nuestra futura práctica docente. Entre ellos, cómo diseñar instrumentos de evaluación verdaderamente inclusivos, cómo generar procesos efectivos de autoevaluación y coevaluación, cómo ofrecer retroalimentaciones que favorezcan el aprendizaje y cómo construir propuestas evaluativas capaces de contemplar la diversidad de trayectorias presentes en las aulas.",
    "Concluimos este recorrido comprendiendo que la evaluación no debe reducirse a una instancia de medición o calificación. Por el contrario, constituye una herramienta fundamental para comprender los procesos de aprendizaje, orientar la enseñanza y promover la mejora continua. Esta transformación conceptual representa, sin duda, uno de los aprendizajes más valiosos construidos durante la cursada y un aporte significativo para nuestro futuro desempeño como docentes."
  ];

  const narrativeOffsets = [];
  let currentNarrativeOffset = 0;
  narrativeParagraphs.forEach((p) => {
    narrativeOffsets.push({ start: currentNarrativeOffset, end: currentNarrativeOffset + p.length });
    currentNarrativeOffset += p.length + 2;
  });

  const renderNarrativeParagraph = (pText, index) => {
    const { start, end } = narrativeOffsets[index];
    if (narrativeHighlightIndex >= start && narrativeHighlightIndex < end) {
      const localStart = narrativeHighlightIndex - start;
      const localLength = narrativeHighlightLength;
      const before = pText.substring(0, localStart);
      const highlighted = pText.substring(localStart, localStart + localLength);
      const after = pText.substring(localStart + localLength);
      return (
        <>
          {before}
          <mark style={{ backgroundColor: 'var(--primary-orange)', color: 'white', borderRadius: '4px', padding: '0 2px' }}>{highlighted}</mark>
          {after}
        </>
      );
    }
    return pText;
  };

  const playNarrativeAudio = () => {
    if ('speechSynthesis' in window) {
      if (isNarrativeSpeaking) {
        window.narrativeCancelled = true;
        window.speechSynthesis.cancel();
        setIsNarrativeSpeaking(false);
        setNarrativeHighlightIndex(-1);
        return;
      }
      
      window.narrativeCancelled = false;
      window.speechSynthesis.cancel(); 
      setIsSpeaking(false);
      setIsModalSpeaking(false);
      setHighlightIndex(-1);

      let pIndex = 0;
      
      const speakParagraph = () => {
        if (pIndex >= narrativeParagraphs.length || window.narrativeCancelled) {
          setIsNarrativeSpeaking(false);
          setNarrativeHighlightIndex(-1);
          return;
        }
        
        const textToRead = narrativeParagraphs[pIndex];
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'es-ES';
        
        const offset = narrativeOffsets[pIndex].start;
        
        utterance.onboundary = (event) => {
          if (event.name === 'word') {
            setNarrativeHighlightIndex(offset + event.charIndex);
            setNarrativeHighlightLength(event.charLength);
          }
        };
        
        utterance.onend = () => {
          if (window.narrativeCancelled) return;
          pIndex++;
          speakParagraph();
        };
        
        // Prevent GC bug in Chrome
        window.currentUtterance = utterance; 
        
        window.speechSynthesis.speak(utterance);
      };
      
      setIsNarrativeSpeaking(true);
      
      // Slight delay to ensure previous cancel() is fully processed
      setTimeout(speakParagraph, 50);
      
    } else {
      showAlert("Lo siento, tu navegador no soporta la lectura de texto en voz alta.");
    }
  };

  const conclusionCards = [
    [
      "La elaboración de este portafolio nos permitió reconstruir nuestro recorrido de aprendizaje y reflexionar sobre las transformaciones que se produjeron en nuestras concepciones acerca de la evaluación durante la cursada de Taller de Evaluación.",
      "A través de las distintas evidencias seleccionadas pudimos identificar cómo nuestras ideas iniciales, centradas principalmente en la acreditación de conocimientos y la asignación de calificaciones, fueron evolucionando hacia una comprensión más amplia, crítica y formativa de la evaluación. Las lecturas, los debates, los foros y las actividades desarrolladas nos permitieron reconocer que evaluar implica mucho más que medir resultados: supone comprender procesos, acompañar trayectorias, brindar retroalimentación y favorecer aprendizajes significativos.",
      "Los aportes de los distintos autores trabajados durante la materia fortalecieron nuestra comprensión de la evaluación como una práctica pedagógica orientada a la mejora continua. Asimismo, la reflexión sobre criterios de evaluación, rúbricas, evaluación multirreferencial, autoevaluación y portafolios nos permitió reconocer la importancia de construir procesos evaluativos más transparentes, participativos e inclusivos."
    ].join('\n\n'),
    "Consideramos que uno de los aprendizajes más valiosos de esta experiencia fue comprender que la evaluación forma parte inseparable del proceso de enseñanza y aprendizaje. Desde esta perspectiva, deja de ser una instancia de control para convertirse en una herramienta que permite reconocer avances, detectar dificultades, orientar decisiones pedagógicas y promover el desarrollo integral de los estudiantes.",
    [
      "Como futuros docentes, asumimos el desafío de construir prácticas evaluativas coherentes con estos principios, capaces de favorecer la reflexión, la autonomía y el aprendizaje significativo. Este portafolio constituye no sólo una síntesis de los conocimientos adquiridos, sino también una evidencia del proceso de transformación y crecimiento profesional desarrollado a lo largo de la cursada.",
      "Como futuros docentes, asumimos el desafío de construir prácticas evaluativas coherentes, que favorezcan la reflexión, la autonomía y el aprendizaje significativo."
    ].join('\n\n')
  ];

  const conclusionOffsets = [];
  let currentConclusionOffset = 0;
  conclusionCards.forEach((c) => {
    conclusionOffsets.push({ start: currentConclusionOffset, end: currentConclusionOffset + c.length });
    currentConclusionOffset += c.length + 2;
  });

  const renderConclusionParagraph = (pText, index) => {
    const { start, end } = conclusionOffsets[index];
    if (conclusionHighlightIndex >= start && conclusionHighlightIndex < end) {
      const localStart = conclusionHighlightIndex - start;
      const localLength = conclusionHighlightLength;
      const before = pText.substring(0, localStart);
      const highlighted = pText.substring(localStart, localStart + localLength);
      const after = pText.substring(localStart + localLength);
      return (
        <>
          {before}
          <mark style={{ backgroundColor: 'var(--primary-orange)', color: 'white', borderRadius: '4px', padding: '0 2px' }}>{highlighted}</mark>
          {after}
        </>
      );
    }
    return pText;
  };

  const playConclusionAudio = () => {
    if ('speechSynthesis' in window) {
      if (isConclusionSpeaking) {
        window.conclusionCancelled = true;
        window.speechSynthesis.cancel();
        setIsConclusionSpeaking(false);
        setConclusionHighlightIndex(-1);
        return;
      }
      
      window.conclusionCancelled = false;
      window.speechSynthesis.cancel(); 
      setIsSpeaking(false);
      setIsModalSpeaking(false);
      setIsNarrativeSpeaking(false);
      setHighlightIndex(-1);
      setNarrativeHighlightIndex(-1);

      let pIndex = 0;
      
      const speakParagraph = () => {
        if (pIndex >= conclusionCards.length || window.conclusionCancelled) {
          setIsConclusionSpeaking(false);
          setConclusionHighlightIndex(-1);
          return;
        }
        
        const textToRead = conclusionCards[pIndex];
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'es-ES';
        
        const offset = conclusionOffsets[pIndex].start;
        
        utterance.onboundary = (event) => {
          if (event.name === 'word') {
            setConclusionHighlightIndex(offset + event.charIndex);
            setConclusionHighlightLength(event.charLength);
          }
        };
        
        utterance.onend = () => {
          if (window.conclusionCancelled) return;
          pIndex++;
          speakParagraph();
        };
        
        window.currentUtterance = utterance; 
        window.speechSynthesis.speak(utterance);
      };
      
      setIsConclusionSpeaking(true);
      setTimeout(speakParagraph, 50);
    } else {
      showAlert("Lo siento, tu navegador no soporta la lectura de texto en voz alta.");
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <a href="#" className="logo-container">
            <img src="/logo-escusuper.jpeg" alt="Escuela Superior Gendarmeria Logo" className="logo-img" />
            <span className="logo-text">ESCUELA SUPERIOR DE GENDARMERIA NACIONAL ARGENTINA</span>
          </a>
          
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></span>
            <span style={{ opacity: isMenuOpen ? 0 : 1 }}></span>
            <span style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
          </button>

          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#inicio" className="nav-link" onClick={() => setIsMenuOpen(false)}>Inicio</a>
            <a href="#introduccion" className="nav-link" onClick={() => setIsMenuOpen(false)}>Introducción</a>
            <a href="#evidencias" className="nav-link" onClick={() => setIsMenuOpen(false)}>Evidencias</a>
            <a href="#video" className="nav-link" onClick={() => setIsMenuOpen(false)}>Video</a>
            <a href="#narrativa" className="nav-link" onClick={() => setIsMenuOpen(false)}>Narrativa Final</a>
            <a href="#conclusion" className="nav-link" onClick={() => setIsMenuOpen(false)}>Conclusión</a>
            <button className="btn btn-primary" onClick={() => { setIsContactOpen(true); setIsMenuOpen(false); }} style={{ padding: '8px 20px', marginLeft: '10px' }}>Contacto</button>
          </nav>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="container hero-container">
            <div className="hero-image-wrapper animate-fade-in-up delay-200" style={{ justifyContent: 'flex-start' }}>
              <div className="hero-blob" style={{ left: '-20px', right: 'auto' }}></div>
              <img src="/logo-escusuper.jpeg" alt="Escuela Superior Gendarmeria Logo" className="hero-image" />
            </div>

            <div className="hero-content animate-fade-in-up" style={{ textAlign: 'right', paddingLeft: '80px' }}>
              <h1 className="hero-title" style={{ textAlign: 'right' }}>
                Portafolio de <br/>
                <span>Aprendizaje</span>
              </h1>
              <p className="hero-description" style={{ marginLeft: 'auto', marginRight: 0, textAlign: 'right' }}>
                Un recorrido analítico y reflexivo sobre la cursada de Taller de Evaluación, evidenciando nuestra transformación conceptual en la formación docente.
              </p>
              <div className="hero-buttons" style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                <a href="#evidencias" className="btn btn-primary">Ver Evidencias</a>
                <a href="#introduccion" className="btn btn-secondary">Leer Introducción</a>
              </div>
              
              <div id="buscador" className="animate-fade-in-up" style={{ marginTop: '40px', backgroundColor: 'var(--card-bg)', padding: '20px 25px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '650px', marginLeft: 'auto' }}>
                <form onSubmit={handleUnifiedSearch} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <h3 style={{ 
                    fontSize: '1.2rem', 
                    color: 'white', 
                    backgroundColor: 'var(--primary-blue)', 
                    margin: 0, 
                    padding: '10px 15px', 
                    borderRadius: '8px',
                    whiteSpace: 'nowrap' 
                  }}>
                    Buscador:
                  </h3>
                  <input 
                    type="text" 
                    placeholder="Ingresa tu búsqueda aquí..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ 
                      padding: '10px 15px', 
                      borderRadius: '10px', 
                      border: '1px solid #ccc', 
                      fontSize: '1rem', 
                      flex: 1,
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                    onBlur={(e) => e.target.style.borderColor = '#ccc'}
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: '1.2rem' }}>🔍</span> Buscar
                  </button>
                  {searchQuery === 'admin2026' && (
                    <button 
                      type="button" 
                      onClick={() => setIsAdminLoginOpen(true)}
                      style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', marginLeft: '5px' }}
                      title="Acceso Administrador"
                    >
                      ⚙️
                    </button>
                  )}
                </form>
              </div>

            </div>
          </div>
        </section>

        <section id="introduccion" className="section" style={{ paddingLeft: '10px', paddingRight: '40px', maxWidth: '100%', overflowX: 'hidden' }}>
          <h2 className="section-title fade-up">Introducción</h2>
          <p className="section-description fade-up delay-100">
            Revisando críticamente nuestras experiencias de aprendizaje.
          </p>
          
          <div className="intro-grid fade-up delay-200">
            <div className="intro-text">
              <p>
                {renderParagraph(introParagraphs[0], 0)}
              </p>
              <p>
                {renderParagraph(introParagraphs[1], 1)}
              </p>
              <p>
                {renderParagraph(introParagraphs[2], 2)}
              </p>
              <p>
                {renderParagraph(introParagraphs[3], 3)}
              </p>
              <p style={{
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fontSize: isIntegrantesHovered ? '1.55rem' : '1.4rem',
                color: isIntegrantesHovered ? '#000080' : 'inherit',
                fontWeight: isIntegrantesHovered ? 'bold' : 'normal',
                lineHeight: '1.6',
                marginTop: '30px'
              }}>
                {renderParagraph(introParagraphs[4], 4)}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div className="intro-stats">
                <div className="stat-card">
                  <div className="stat-number">5</div>
                  <div className="stat-label">Evidencias Clave</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Transformación</div>
                </div>
                <div 
                  className="stat-card"
                  onMouseEnter={() => setIsIntegrantesHovered(true)}
                  onMouseLeave={() => setIsIntegrantesHovered(false)}
                  style={{
                    backgroundColor: isIntegrantesHovered ? '#000080' : '',
                    transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <div className="stat-number" style={{ color: isIntegrantesHovered ? '#ffffff' : '' }}>3</div>
                  <div className="stat-label" style={{ color: isIntegrantesHovered ? '#ffffff' : '' }}>Integrantes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Aprendizajes</div>
                </div>
              </div>
              
              <button 
                className="btn btn-primary" 
                onClick={playIntroAudio} 
                style={{ 
                  alignSelf: 'center', 
                  width: '100%', 
                  padding: '15px 20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px',
                  backgroundColor: isSpeaking ? '#e74c3c' : 'var(--primary-orange)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{isSpeaking ? '⏹' : '🔊'}</span> 
                {isSpeaking ? 'Detener lectura' : 'Escuchar introducción'}
              </button>
            </div>
          </div>
        </section>

        <section id="evidencias" className="section evidencias-section">
          <div className="container">
            <h2 className="section-title fade-up">Nuestras Evidencias</h2>
            <p className="section-description fade-up delay-100" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Momentos clave que marcan nuestro recorrido y evolución.
            </p>

            <div className="evidencias-grid fade-up delay-200">
              {evidenciasData.map((evidencia) => (
                <div key={evidencia.id} className="evidencia-card">
                  <div className="evidencia-icon">{evidencia.icon}</div>
                  <div className="evidencia-content">
                    <h3 className="evidencia-title">{evidencia.title}</h3>
                    <p className="evidencia-desc">{evidencia.presentacion.substring(0, 150)}...</p>
                    <button className="btn btn-secondary" onClick={() => setSelectedEvidencia(evidencia)}>Conocer más →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="video" className="section" style={{ paddingTop: '50px', paddingBottom: '50px', paddingLeft: '40px', paddingRight: '40px' }}>
          <div className="fade-up" style={{ textAlign: 'center', maxWidth: '1600px', margin: '0 auto', backgroundColor: 'var(--card-bg)', padding: '80px', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}>
            <h2 className="section-title" style={{ marginBottom: '50px', fontSize: '3.5rem' }}>Transformar la Evaluación</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', textAlign: 'left' }}>
              <div style={{ flex: '1 1 500px' }}>
                <p className="section-description" style={{ color: 'var(--text-dark)', fontSize: '1.65rem', lineHeight: '1.7', margin: 0, textAlign: 'justify' }}>
                  En este material audiovisual exploramos cómo repensar nuestras prácticas evaluativas. El objetivo es transitar de un modelo centrado únicamente en la calificación hacia uno que promueva el aprendizaje continuo, la reflexión y la retroalimentación constructiva.
                </p>
              </div>
              <div className="video-wrapper" style={{ flex: '1.5 1 600px' }}>
                <video 
                  controls 
                  style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}
                  src="/video-transformar-la-evaluacion.mp4"
                  preload="metadata"
                >
                  Tu navegador no soporta la etiqueta de video.
                </video>
              </div>
            </div>
          </div>
        </section>

        <section id="narrativa" className="section" style={{ maxWidth: '100%', padding: '60px 40px', backgroundColor: 'var(--bg-light)' }}>
          <div className="fade-up" style={{ width: '100%', maxWidth: '100%', margin: '0', backgroundColor: 'var(--card-bg)', padding: '50px', borderRadius: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', height: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h2 className="section-title" style={{ margin: 0, marginBottom: '20px', fontSize: '2.5rem' }}>NARRATIVA INTEGRADORA FINAL</h2>
                <p className="section-description" style={{ margin: 0 }}>Nuestro recorrido de aprendizaje y conclusión</p>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={playNarrativeAudio} 
                style={{ 
                  padding: '12px 25px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  backgroundColor: isNarrativeSpeaking ? '#e74c3c' : 'var(--primary-orange)'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{isNarrativeSpeaking ? '⏹' : '🔊'}</span> 
                {isNarrativeSpeaking ? 'Detener lectura' : 'Escuchar lectura'}
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '20px', textAlign: 'justify', fontSize: '1.2rem', lineHeight: '1.7', color: 'var(--text-dark)' }}>
              {narrativeParagraphs.map((p, i) => (
                <p key={i} style={{ marginBottom: '20px' }}>
                  {renderNarrativeParagraph(p, i)}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="conclusion" className="section" style={{ padding: '60px 10px', backgroundColor: 'var(--bg-light)' }}>
          <div className="fade-up" style={{ width: '100%', maxWidth: '100%', margin: '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px', padding: '0 20px' }}>
              <h2 className="section-title" style={{ margin: 0, fontSize: '3rem', color: 'var(--primary-green)' }}>CONCLUSIÓN</h2>
              <button 
                className="btn btn-primary" 
                onClick={playConclusionAudio} 
                style={{ 
                  padding: '12px 25px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  backgroundColor: isConclusionSpeaking ? '#e74c3c' : 'var(--primary-orange)'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{isConclusionSpeaking ? '⏹' : '🔊'}</span> 
                {isConclusionSpeaking ? 'Detener lectura' : 'Escuchar conclusión'}
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {/* Card 1 */}
              <div style={{ backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: '30px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', height: '550px', overflowY: 'auto' }}>
                <div style={{ textAlign: 'justify', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-dark)', whiteSpace: 'pre-line' }}>
                  {renderConclusionParagraph(conclusionCards[0], 0)}
                </div>
              </div>
              {/* Card 2 */}
              <div style={{ backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: '30px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', height: '550px', overflowY: 'auto' }}>
                <div style={{ textAlign: 'justify', fontSize: '1.45rem', fontWeight: 'bold', lineHeight: '1.8', color: 'var(--primary-orange)', whiteSpace: 'pre-line' }}>
                  {renderConclusionParagraph(conclusionCards[1], 1)}
                </div>
              </div>
              {/* Card 3 */}
              <div style={{ backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: '30px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', height: '550px', overflowY: 'auto' }}>
                <div style={{ textAlign: 'justify', fontSize: '1.2rem', fontWeight: '500', lineHeight: '1.8', color: 'var(--primary-green)', whiteSpace: 'pre-line' }}>
                  {renderConclusionParagraph(conclusionCards[2], 2)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas-frecuentes" className="section fade-up" style={{ padding: '60px 40px', backgroundColor: 'var(--bg-light)' }}>
          <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', backgroundColor: 'var(--card-bg)', padding: '50px', borderRadius: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', color: 'var(--primary-blue)' }}>Preguntas para Reflexionar</h2>
            <div className="accordion-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {[
                {
                  id: 1,
                  question: "¿Cómo transformamos la evaluación tradicional?",
                  answer: "La evaluación no debe limitarse a medir resultados o asignar calificaciones. Se trata de integrarla como una herramienta continua que acompañe el aprendizaje, identificando avances y áreas de mejora desde una mirada multirreferencial."
                },
                {
                  id: 2,
                  question: "¿Qué papel juega la retroalimentación en el aprendizaje?",
                  answer: "La retroalimentación es el puente entre el estado actual del aprendizaje y los objetivos esperados. Cuando es constructiva, oportuna y clara, motiva a los estudiantes y les permite tomar decisiones estratégicas sobre su propio proceso."
                },
                {
                  id: 3,
                  question: "¿Por qué es importante explicitar los criterios de evaluación?",
                  answer: "Compartir los criterios de evaluación transparenta las expectativas, empoderando a los estudiantes para que asuman un rol activo. Saber qué y cómo serán evaluados promueve la autonomía y la autoevaluación reflexiva."
                },
                {
                  id: 4,
                  question: "¿Cómo pueden las rúbricas guiar nuestras prácticas docentes?",
                  answer: "Las rúbricas no son solo instrumentos de calificación, sino poderosas herramientas de enseñanza. Permiten clarificar las metas de aprendizaje, guiar el trabajo del estudiante y estructurar una retroalimentación justa y precisa."
                }
              ].map((item) => (
                <div key={item.id} className="accordion-item" style={{ border: '1px solid #eee', borderRadius: '15px', overflow: 'hidden' }}>
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    style={{ 
                      width: '100%', 
                      padding: '20px 25px', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      backgroundColor: openAccordion === item.id ? 'var(--primary-blue)' : 'white', 
                      color: openAccordion === item.id ? 'white' : 'var(--text-dark)',
                      border: 'none', 
                      cursor: 'pointer', 
                      textAlign: 'left', 
                      fontSize: '1.25rem', 
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.question}
                    <span style={{ fontSize: '1.8rem', transform: openAccordion === item.id ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s', lineHeight: '1' }}>+</span>
                  </button>
                  <div style={{ 
                    maxHeight: openAccordion === item.id ? '300px' : '0', 
                    overflow: 'hidden', 
                    transition: 'max-height 0.4s ease-in-out',
                    backgroundColor: '#fafafa'
                  }}>
                    <p style={{ padding: '25px', margin: 0, fontSize: '1.15rem', color: 'var(--text-dark)', lineHeight: '1.6', textAlign: 'justify' }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'left' }}>
                <img src="/logo-escusuper.jpeg" alt="Logo" style={{ marginBottom: 0, width: '60px', height: '60px', objectFit: 'contain', backgroundColor: 'white', padding: '5px', borderRadius: '12px' }} />
                <p style={{ margin: 0, lineHeight: '1.4' }}>Escuela Superior Gendarmería<br/>Saber para hacer</p>
              </div>
              <div style={{ display: 'flex', gap: '15px', marginTop: '5px', alignItems: 'center' }}>
                <div className="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={{ width: '16px', height: '16px', fill: 'white' }}><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
                </div>
                <div className="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '16px', height: '16px', fill: 'white' }}><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.6 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                </div>
                <div className="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: '18px', height: '18px', fill: 'white' }}><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                </div>
                <div className="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{ width: '18px', height: '18px', fill: 'white' }}><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>
                </div>
              </div>
            </div>
            <div className="footer-links">
              <h4>Secciones</h4>
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#introduccion">Introducción</a></li>
                <li><a href="#evidencias">Evidencias</a></li>
                <li><a href="#narrativa">Narrativa Final</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Autores</h4>
              <ul>
                <li>Raúl Dirie</li>
                <li>Rubén Darío Pérez</li>
                <li>Sergio Barrios</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Taller de Evaluación. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {isContactOpen && (
        <div className="modal-overlay" onClick={() => setIsContactOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsContactOpen(false)}>×</button>
            <h2 className="modal-title">Contáctanos</h2>
            <form className="contact-form" action="https://formsubmit.co/perezdario16@gmail.com" method="POST" onSubmit={handleContactSubmit}>
              <input type="hidden" name="_subject" value="Nuevo contacto desde Landing Page - Taller de Evaluación" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={window.location.href} />
              <div className="form-group">
                <label>Nombre y Apellido</label>
                <input type="text" name="nombre" required placeholder="Ingresa tu nombre completo" />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="tel" name="telefono" required placeholder="Ingresa tu teléfono" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" required placeholder="Ingresa tu correo" />
              </div>
              <div className="form-group">
                <label>Mensaje</label>
                <textarea name="mensaje" required placeholder="Escribe tu mensaje" rows="4"></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Enviar Mensaje</button>
            </form>
          </div>
        </div>
      )}

      {selectedEvidencia && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" style={{ maxWidth: '800px', maxHeight: '85vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', gap: '20px' }}>
              <h2 className="modal-title" style={{ fontSize: '2rem', color: 'var(--primary-orange)', margin: 0, flex: 1 }}>
                {selectedEvidencia.title}
              </h2>
              <button 
                className="btn btn-primary" 
                onClick={playModalAudio} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  padding: '10px 15px',
                  backgroundColor: isModalSpeaking ? '#e74c3c' : 'var(--primary-orange)',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{isModalSpeaking ? '⏹' : '🔊'}</span> 
                {isModalSpeaking ? 'Detener' : 'Escuchar'}
              </button>
            </div>
            <div className="evidencia-detalle-texto" style={{ textAlign: 'justify', fontSize: '1.15rem', lineHeight: '1.7', color: 'var(--text-dark)' }}>
              <h4 style={{ color: 'var(--secondary-blue)', marginBottom: '10px' }}>Presentación de la evidencia</h4>
              <p style={{ marginBottom: '25px' }}>{selectedEvidencia.presentacion}</p>
              
              <h4 style={{ color: 'var(--secondary-blue)', marginBottom: '10px' }}>ORIGEN</h4>
              <p style={{ marginBottom: '25px' }}>{selectedEvidencia.origen}</p>
              
              <h4 style={{ color: 'var(--secondary-blue)', marginBottom: '10px' }}>CONCEPTO</h4>
              <p style={{ marginBottom: '25px' }}>{selectedEvidencia.concepto}</p>
              
              <h4 style={{ color: 'var(--secondary-blue)', marginBottom: '10px' }}>DIÁLOGO</h4>
              <p style={{ marginBottom: '25px' }}>{selectedEvidencia.dialogo}</p>
              
              <h4 style={{ color: 'var(--secondary-blue)', marginBottom: '10px' }}>EVOLUCIÓN</h4>
              <p style={{ marginBottom: '25px' }}>{selectedEvidencia.evolucion}</p>
            </div>
            <button className="btn btn-secondary" onClick={closeModal} style={{ width: '100%', marginTop: '20px', backgroundColor: 'var(--primary-green)', color: 'white', border: 'none' }}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {isAlertOpen && (
        <div className="modal-overlay" onClick={() => setIsAlertOpen(false)} style={{ zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content fade-up" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '40px 30px', borderRadius: '25px', backgroundColor: 'var(--card-bg)', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>⚠️</div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-orange)', marginBottom: '15px' }}>Aviso</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '30px', lineHeight: '1.6' }}>{alertMessage}</p>
            <button className="btn btn-primary" onClick={() => setIsAlertOpen(false)} style={{ width: '100%', padding: '15px', fontSize: '1.2rem', borderRadius: '15px' }}>Aceptar</button>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {isConfirmOpen && (
        <div className="modal-overlay" onClick={() => setIsConfirmOpen(false)} style={{ zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content fade-up" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '40px 30px', borderRadius: '25px', backgroundColor: 'var(--card-bg)', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>❓</div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-blue)', marginBottom: '15px' }}>Confirmar</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '30px', lineHeight: '1.6' }}>{confirmMessage}</p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setIsConfirmOpen(false)} style={{ flex: 1, padding: '15px', fontSize: '1.1rem', borderRadius: '15px' }}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => { 
                if (confirmAction) confirmAction(); 
                setIsConfirmOpen(false); 
              }} style={{ flex: 1, padding: '15px', fontSize: '1.1rem', borderRadius: '15px', backgroundColor: '#e74c3c', border: 'none' }}>Aceptar</button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {isAdminLoginOpen && (
        <div className="modal-overlay" onClick={() => setIsAdminLoginOpen(false)} style={{ zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', padding: '40px 30px', borderRadius: '25px', backgroundColor: 'var(--card-bg)', animation: 'fadeIn 0.2s ease-out' }}>
            <h2 className="modal-title" style={{ textAlign: 'center', marginBottom: '20px' }}>Acceso Administrador</h2>
            <form autoComplete="off" onSubmit={(e) => {
              e.preventDefault();
              if (adminUser === 'admin2026' && adminPass === 'admin2026') {
                setIsAdminLoginOpen(false);
                setIsAdminPanelOpen(true);
                setAdminUser('');
                setAdminPass('');
                setShowAdminPass(false);
                setSearchQuery('');
              } else {
                showAlert("Credenciales incorrectas");
              }
            }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* Dummy inputs to absorb Chrome autofill */}
              <input type="text" style={{ display: 'none' }} aria-hidden="true" />
              <input type="password" style={{ display: 'none' }} aria-hidden="true" />
              
              <input type="search" name="fake_user" autoComplete="new-password" placeholder="Usuario" value={adminUser} onChange={e => setAdminUser(e.target.value)} required autoFocus style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary-green)'} onBlur={(e) => e.target.style.borderColor = '#ccc'} />
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input type={showAdminPass ? "text" : "password"} name="fake_pass" autoComplete="new-password" placeholder="Contraseña" value={adminPass} onChange={e => setAdminPass(e.target.value)} required style={{ padding: '12px', paddingRight: '40px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', transition: 'border-color 0.3s', width: '100%' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary-green)'} onBlur={(e) => e.target.style.borderColor = '#ccc'} />
                <button type="button" onClick={() => setShowAdminPass(!showAdminPass)} style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {showAdminPass ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{width: '20px', height: '20px', fill: '#666'}}><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{width: '20px', height: '20px', fill: '#666'}}><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 92.9-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.8-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM128 256a160 160 0 1 1 320 0 160 160 0 1 1 -320 0zm160-80a80 80 0 1 0 0 160 80 80 0 1 0 0-160z"/></svg>
                  )}
                </button>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Ingresar</button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Panel Modal */}
      {isAdminPanelOpen && (
        <div className="modal-overlay" style={{ zIndex: 10002, backgroundColor: '#f0f2f5' }}>
          <div style={{ width: '100%', height: '100%', padding: '40px', overflowY: 'auto', backgroundColor: '#f0f2f5' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                <h2 style={{ color: 'var(--primary-blue)', margin: 0, fontSize: '2rem' }}>Panel de Administración</h2>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button onClick={() => {
                    showConfirm("¿Seguro que deseas borrar todos los mensajes?", async () => {
                      try {
                        for (const msg of contactMessages) {
                          await deleteDoc(doc(db, "contactMessages", msg.id));
                        }
                        setContactMessages([]);
                      } catch (error) {
                        console.error("Error deleting messages:", error);
                        showAlert("Error al borrar los mensajes");
                      }
                    });
                  }} className="btn" style={{ backgroundColor: '#e74c3c', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>Limpiar Bandeja</button>
                  <button onClick={() => { setIsAdminPanelOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn" style={{ backgroundColor: 'var(--primary-blue)', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>Volver al Inicio y Cerrar</button>
                </div>
              </div>
              
              <h3 style={{ marginBottom: '20px', color: 'var(--text-dark)' }}>Mensajes de Contacto ({contactMessages.length})</h3>
              
              {contactMessages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f9f9f9', borderRadius: '15px', color: 'var(--text-muted)' }}>
                  No hay mensajes guardados en este navegador.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {contactMessages.map(msg => (
                    <div key={msg.id} style={{ border: '1px solid #eee', borderRadius: '15px', padding: '20px', backgroundColor: msg.resolved ? '#e8f5e9' : '#fafafa', transition: 'background-color 0.3s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px', alignItems: 'center' }}>
                        <strong style={{ fontSize: '1.2rem', color: msg.resolved ? '#2e7d32' : 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {msg.nombre} 
                          {msg.resolved && <span style={{ fontSize: '0.9rem', backgroundColor: '#4caf50', color: 'white', padding: '2px 8px', borderRadius: '10px' }}>Resuelto ✓</span>}
                        </strong>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{msg.date}</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '15px', fontSize: '0.95rem' }}>
                        <div><strong>Email:</strong> <a href={`mailto:${msg.email}`} style={{ color: 'var(--primary-blue)' }}>{msg.email}</a></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <strong>Teléfono:</strong> {msg.telefono}
                          <a href={`https://wa.me/${msg.telefono.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(msg.nombre)},%20te%20contacto%20desde%20la%20Escuela%20Superior%20de%20Gendarmeria%20Nacional%20Argentina`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#25D366', color: 'white', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none', fontSize: '0.85rem' }}>💬 WhatsApp</a>
                        </div>
                      </div>
                      <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '10px', borderLeft: `4px solid ${msg.resolved ? '#4caf50' : 'var(--primary-orange)'}`, marginBottom: '15px' }}>
                        <p style={{ margin: 0, whiteSpace: 'pre-wrap', color: 'var(--text-dark)', lineHeight: '1.6' }}>{msg.mensaje}</p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-dark)', fontWeight: '500' }}>
                          <input type="checkbox" checked={!!msg.resolved} onChange={async (e) => {
                            const newStatus = e.target.checked;
                            try {
                              await updateDoc(doc(db, "contactMessages", msg.id), { resolved: newStatus });
                              setContactMessages(prev => prev.map(m => m.id === msg.id ? { ...m, resolved: newStatus } : m));
                            } catch (err) {
                              console.error("Error updating", err);
                            }
                          }} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                          Marcar como resuelto
                        </label>
                        <button onClick={() => {
                          showConfirm("¿Seguro que deseas borrar este mensaje?", async () => {
                            try {
                              await deleteDoc(doc(db, "contactMessages", msg.id));
                              setContactMessages(prev => prev.filter(m => m.id !== msg.id));
                            } catch (err) {
                              console.error("Error deleting", err);
                            }
                          });
                        }} style={{ backgroundColor: 'transparent', color: '#e74c3c', border: '1px solid #e74c3c', padding: '5px 15px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '5px' }} onMouseEnter={e => {e.target.style.backgroundColor='#e74c3c'; e.target.style.color='white';}} onMouseLeave={e => {e.target.style.backgroundColor='transparent'; e.target.style.color='#e74c3c';}}>
                          🗑️ Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://chat.whatsapp.com/JCb66Tl4sN1Bd0P8qOyRxc?s=hd&p=i&mlu=4"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: '#25D366',
          color: 'white',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          zIndex: 1000,
          textDecoration: 'none',
          animation: 'heartbeat 2s infinite'
        }}
        title="Unirse al grupo de WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: '35px', height: '35px', fill: 'currentColor' }}><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 414.7c-32.3 0-64-8.7-91.8-25.1l-6.6-3.9-68.1 17.9 18.2-66.4-4.3-6.8c-18-28.1-27.5-60.6-27.5-93.6 0-103.5 84.3-187.8 188-187.8 50.2 0 97.4 19.6 132.9 55.1 35.5 35.5 55.1 82.7 55.1 133-1 103.5-85.3 187.6-188.1 187.6zM326.8 284c-5.6-2.8-33.3-16.5-38.5-18.4-5.2-1.9-8.9-2.8-12.7 2.8-3.8 5.6-14.6 18.4-17.9 22.1-3.3 3.8-6.6 4.2-12.2 1.4-5.6-2.8-23.7-8.8-45.2-28-16.6-14.8-27.8-33.1-31.1-38.8-3.3-5.6-.4-8.6 2.4-11.4 2.5-2.5 5.6-6.6 8.4-9.9 2.8-3.3 3.8-5.6 5.6-9.4 1.9-3.8.9-7.1-.5-9.9-1.4-2.8-12.7-30.7-17.4-42-4.6-11-9.3-9.5-12.7-9.7-3.3-.2-7.1-.2-10.9-.2-3.8 0-9.9 1.4-15 7.1-5.2 5.6-19.8 19.3-19.8 47.1 0 27.8 20.3 54.7 23.1 58.4 2.8 3.8 39.8 60.8 96.5 85.2 13.5 5.8 24 9.3 32.2 11.9 13.6 4.3 26 3.7 35.8 2.2 11-1.7 33.3-13.6 38-26.8 4.7-13.2 4.7-24.5 3.3-26.8-1.4-2.3-5.2-3.7-10.8-6.5z"/></svg>
      </a>

      {/* Install PWA Modal */}
      {showInstallModal && (
        <div className="modal-overlay" style={{ zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content fade-up" style={{ maxWidth: '450px', textAlign: 'center', padding: '40px 30px', borderRadius: '25px', backgroundColor: 'var(--card-bg)', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>
            <img src="/logo-escusuper.jpeg" alt="Logo" style={{ width: '80px', height: '80px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }} />
            <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-green)', marginBottom: '15px' }}>¡Instala nuestra App!</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '30px', lineHeight: '1.6' }}>Descarga la aplicación en tu celular o computadora para tener acceso directo y una mejor experiencia, sin necesidad de usar el navegador.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button className="btn btn-primary" onClick={handleInstallClick} style={{ width: '100%', padding: '15px', fontSize: '1.1rem', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', border: 'none', cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{width: '20px', height: '20px', fill: 'white'}}><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                Instalar Aplicación
              </button>
              <button className="btn btn-secondary" onClick={handleDismissInstall} style={{ width: '100%', padding: '15px', fontSize: '1.1rem', borderRadius: '15px', backgroundColor: '#f1f1f1', color: 'var(--text-muted)', border: 'none', cursor: 'pointer' }}>Quizás más tarde</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
