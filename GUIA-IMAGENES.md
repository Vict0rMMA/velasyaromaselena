# 🖼️ Guía para Agregar tus Imágenes

## 📁 **Estructura de Carpetas**

Tu proyecto ya tiene esta estructura:
```
velasyaromaselena-main/
├── assets/
│   ├── productos/          ← Aquí van tus imágenes de productos
│   ├── logo.svg           ← Tu logo actual
│   └── ...
├── index-tailwind.html    ← Página principal
└── ...
```

## 🎯 **Pasos para Agregar tus Imágenes**

### **Paso 1: Preparar tus Imágenes**

#### **Formatos Recomendados:**
- **JPG/JPEG**: Para fotografías (más pequeño)
- **PNG**: Para imágenes con transparencia
- **WebP**: Mejor compresión (moderno)

#### **Tamaños Recomendados:**
- **Productos**: 800×600 píxeles (o 4:3)
- **Logo**: 200×200 píxeles
- **Hero/Banner**: 1920×1080 píxeles

### **Paso 2: Nombres de Archivos**

Renombra tus imágenes con estos nombres exactos:

```
assets/productos/
├── cedro-verbena.jpg      ← Vela Cedro Verbena
├── tilo-bamboo.jpg        ← Vela Tilo Bamboo  
├── lavanda.jpg           ← Vela Lavanda Relajante
├── matera-mariposa.jpg   ← Matera Vela Mariposa Mini
├── rosa-silvestre.jpg    ← Vela Rosa Silvestre
├── citricos.jpg          ← Vela Cítricos Energizantes
├── vela-corazon.jpg      ← Vela Corazón (Amor y Amistad)
├── vela-rosa.jpg         ← Vela Rosa Aromática (Amor y Amistad)
├── vela-vainilla.jpg     ← Vela Vainilla Acariciante (Amor y Amistad)
├── vela-chocolate.jpg    ← Vela Chocolate Tentador (Amor y Amistad)
├── vela-fresa.jpg        ← Vela Fresa Dulce (Amor y Amistad)
├── vela-canela.jpg       ← Vela Canela Cálida (Amor y Amistad)
├── vela-pino.jpg         ← Vela Pino Navideño (Navidad)
├── vela-canela-navidad.jpg ← Vela Canela Navideña (Navidad)
├── vela-vainilla-navidad.jpg ← Vela Vainilla Navideña (Navidad)
├── vela-chocolate-navidad.jpg ← Vela Chocolate Navideño (Navidad)
├── vela-manzana-canela.jpg ← Vela Manzana Canela (Navidad)
├── vela-especias-navidad.jpg ← Vela Especias Navideñas (Navidad)
├── vela-blanca-sagrada.jpg ← Vela Blanca Sagrada (Primera Comunión)
├── vela-incienso-sagrado.jpg ← Vela Incienso Sagrado (Primera Comunión)
├── vela-sandalo-sagrado.jpg ← Vela Sándalo Sagrado (Primera Comunión)
├── vela-rosa-sagrada.jpg ← Vela Rosa Sagrada (Primera Comunión)
├── vela-lavanda-sagrada.jpg ← Vela Lavanda Sagrada (Primera Comunión)
└── vela-mirra-sagrada.jpg ← Vela Mirra Sagrada (Primera Comunión)
```

### **Paso 3: Copiar Imágenes**

#### **Opción A: Copiar y Pegar**
1. Abre la carpeta `assets/productos/`
2. Copia tus imágenes desde tu computadora
3. Pégalas en la carpeta
4. Renómbralas según la lista de arriba

#### **Opción B: Comando PowerShell**
```powershell
# Desde tu carpeta de imágenes
Copy-Item "C:\ruta\a\tu\imagen1.jpg" "C:\Users\victo\Downloads\velasyaromaselena-main\assets\productos\cedro-verbena.jpg"
Copy-Item "C:\ruta\a\tu\imagen2.jpg" "C:\Users\victo\Downloads\velasyaromaselena-main\assets\productos\tilo-bamboo.jpg"
# ... etc para cada imagen
```

### **Paso 4: Verificar que Funcionen**

Una vez que tengas las imágenes en la carpeta, la página automáticamente las mostrará. Si no tienes alguna imagen, se mostrará el icono como respaldo.

## 🎨 **Consejos para Imágenes Profesionales**

### **Fotografía de Productos:**
- **Fondo limpio**: Blanco o gris claro
- **Buena iluminación**: Natural o artificial suave
- **Ángulo**: 45° o frontal
- **Enfoque**: Producto nítido
- **Composición**: Regla de tercios

### **Optimización:**
- **Tamaño**: Máximo 500KB por imagen
- **Resolución**: 72 DPI para web
- **Compresión**: JPG calidad 80-85%

## 🔧 **Personalización Avanzada**

### **Si quieres cambiar los nombres de archivo:**

Edita estas líneas en `index-tailwind.html`:

```html
<!-- Cambia "cedro-verbena.jpg" por tu nombre de archivo -->
<img src="assets/productos/TU-NOMBRE-DE-ARCHIVO.jpg" alt="Vela Cedro Verbena">
```

### **Si quieres agregar más productos:**

1. Copia un bloque de producto completo
2. Cambia el nombre de la imagen
3. Actualiza la información del producto
4. Agrega la imagen a la carpeta `assets/productos/`

## 📱 **Imágenes Responsive**

Las imágenes ya están configuradas para:
- **Móvil**: Se adaptan automáticamente
- **Tablet**: Mantienen proporción
- **Desktop**: Se ven perfectas en cualquier pantalla

## 🚀 **Después de Agregar las Imágenes**

1. **Prueba la página**: Abre `index-tailwind.html` en tu navegador
2. **Verifica que se vean bien**: En móvil y desktop
3. **Sube a Git**: Para actualizar Vercel

```bash
# Comandos para subir a Git
git add .
git commit -m "Agregadas imágenes de productos"
git push origin main
```

## ❓ **Problemas Comunes**

### **La imagen no se muestra:**
- Verifica que el nombre del archivo coincida exactamente
- Asegúrate de que esté en la carpeta `assets/productos/`
- Revisa que la extensión sea correcta (.jpg, .png, etc.)

### **La imagen se ve pixelada:**
- Usa una imagen de mayor resolución
- Optimiza la compresión
- Verifica que no esté estirándose

### **La imagen es muy grande:**
- Redimensiona la imagen antes de subirla
- Usa herramientas online como TinyPNG
- Comprime con Photoshop o GIMP

## 🎯 **Ejemplo de Imagen Perfecta**

Para la **Matera Vela Mariposa Mini**:
- **Tamaño**: 800×600 píxeles
- **Formato**: JPG
- **Peso**: < 300KB
- **Fondo**: Rosa claro o blanco
- **Enfoque**: En la mariposa y el diseño
- **Nombre**: `matera-mariposa.jpg`

¡Con estas imágenes tu página se verá súper profesional! 🕯️✨ 