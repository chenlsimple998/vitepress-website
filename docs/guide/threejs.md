# Three.js 详解

## 一、基本概念
在 Three.js 中，有几个核心的基本概念，它们是构建 3D 场景的基础：
1. **场景（Scene）**：场景如同一个虚拟的舞台，是 Three.js 中所有对象的容器。所有的 3D 元素，如物体、灯光、相机等，都被添加到场景中进行展示。通过 `const scene = new THREE.Scene();` 即可创建一个场景实例。
2. **相机（Camera）**：相机决定了我们观察场景的角度。常见的相机类型有：
    - **透视相机（PerspectiveCamera）**：这种相机模拟人眼的视角，能够产生近大远小的效果，非常适用于大多数 3D 场景。例如 `const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);`，其中参数依次为视角、宽高比、近裁剪平面、远裁剪平面。
    - **正交相机（OrthographicCamera）**：与透视相机不同，正交相机不会产生透视效果，物体无论远近大小都保持一致，常用于 2D 场景或需要精确尺寸的 3D 场景。
3. **渲染器（Renderer）**：渲染器的作用是将场景和相机的内容渲染到网页上的指定元素中。例如：
```javascript
const renderer = new THREE.WebGLRenderer(); 
renderer.setSize(window.innerWidth, window.innerHeight); 
document.body.appendChild(renderer.domElement);
```
这里创建了一个 WebGL 渲染器，并设置了其大小，然后将渲染器的 DOM 元素添加到页面中。
4. **物体（Object）**：物体是场景中的具体元素，由几何形状（Geometry）和材质（Material）组成。以创建一个简单的立方体为例：
```javascript
// 创建几何形状（立方体）
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质（基础材质）
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建网格物体（将几何形状和材质组合）
const cube = new THREE.Mesh(geometry, material);
// 将物体添加到场景中
scene.add(cube);
```

## 二、几何形状（Geometry）
Three.js 提供了丰富的内置几何形状：
- **BoxGeometry**：立方体几何形状，可根据需求设置长、宽、高。
- **SphereGeometry**：球体几何形状，能够设置半径、分段数等参数。
- **CylinderGeometry**：圆柱体几何形状，可设置半径、高度、分段数等属性。
此外，还可以通过自定义顶点、面等信息来创建独特的自定义几何形状。

## 三、材质（Material）
材质决定了物体的外观，包括颜色、纹理、透明度等方面。常见的材质类型有：
- **MeshBasicMaterial**：基础材质，不具备光照效果，常用于简单的展示场景。
- **MeshLambertMaterial**：具有漫反射效果，受光照影响，适合表现不光滑的表面。
- **MeshPhongMaterial**：具有镜面反射效果，能呈现出更真实的光泽，适合光滑的表面。
- **Texture**：纹理材质，可以将图片映射到物体表面，大大增加真实感。例如：
```javascript
const texture = new THREE.TextureLoader().load('texture.jpg'); 
const material = new THREE.MeshBasicMaterial({ map: texture });
```

## 四、灯光（Light）
灯光在 Three.js 中用于照亮场景中的物体，使场景更加逼真。常见的灯光类型有：
- **AmbientLight**：环境光，均匀地照亮整个场景，没有明确的光源方向。
- **DirectionalLight**：平行光，类似太阳光，从一个方向照射过来，具有明确的方向。
- **PointLight**：点光源，从一个点向四周发射光线，比如灯泡。
- **SpotLight**：聚光灯，像手电筒一样，从一个点向一个方向发射出锥形的光线。

## 五、动画（Animation）
在 Three.js 中实现动画，通常是通过不断更新场景中的物体属性来达成。一般在渲染循环中进行，例如：
```javascript
function animate() {
    requestAnimationFrame(animate);
    // 更新物体的旋转角度
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
```
`requestAnimationFrame` 会在浏览器下次重绘之前调用指定的函数，从而实现流畅的动画效果。

## 六、加载模型
Three.js 支持加载多种格式的 3D 模型，如 GLTF、OBJ、FBX 等。通常使用相应的加载器来加载模型，以 GLTF 格式为例：
```javascript
const loader = new THREE.GLTFLoader();
loader.load('model.gltf', function (gltf) {
    scene.add(gltf.scene);
});
```

## 七、交互（Interaction）
通过监听鼠标、键盘等事件，可以实现与 3D 场景的交互。以监听鼠标点击事件为例：
```javascript
document.addEventListener('click', function (event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        // 处理点击到物体的逻辑
    }
});
```

## 八、Three.js 中的重要元素详细说明
1. **三大基本概念：场景、相机、渲染器**
    - **场景**：作为容器和舞台，承载着所有的 3D 元素。
    - **相机**：决定观察的角度、方位和视角。
    - **渲染器**：将场景和相机结合起来，进行投影和渲染操作。
2. **创建场景相关代码示例**
```javascript
// 1、创建场景
const scene = new THREE.Scene();
// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera); 
```
3. **物体形状：几何体Geometry**
```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1)
```
4. **物体外观：材质Material**
如果想要定义物体的外观效果，比如颜色等，就需要借助材质（Material）相关的 API 来实现。
5. **物体：网格模型Mesh**
在现实生活中有各种各样的物体，在 Three.js 中，可以通过网格模型 Mesh 来表示一个虚拟的物体，例如一个箱子、一个鼠标等。
6. **模型位置.position**
在现实生活中，一个物体通常都有其位置，在 Three.js 中也是如此。可以通过位置属性 `.position` 来定义网格模型 Mesh 在三维场景 Scene 中的位置。
7. **透视投影相机PerspectiveCamera**
Three.js 提供了正投影相机 OrthographicCamera 和透视投影相机 PerspectiveCamera，常用的是透视投影相机 PerspectiveCamera。透视投影相机 PerspectiveCamera 的本质是在模拟人眼观察世界的规律。
```javascript
// 实例化一个透视投影相机对象
const camera = new THREE.PerspectiveCamera(
    45, //视角
    window.innerWidth / window.innerHeight, //宽高比
    0.1, //近平面
    1000 //远平面
)
```
8. **相机观察目标.lookAt()**
当使用相机拍照时，需要控制相机的拍照目标，具体来说就是相机镜头对准哪个物体或坐标。对于 Three.js 相机而言，就是设置 `.lookAt()` 方法的参数，指定一个 3D 坐标。
```javascript
// 设置相机位置
camera.position.z = 5
camera.lookAt(0, 0, 0) //原点
```
9. **相机分类**
相机主要分为正交相机、立方相机、透视相机、立体相机等，其中以透视相机为主，因为它主要模拟人眼的观察方式。
10. **材质特性**
基础网格材质不会受到光照的影响，而像标准材质等就会受到光照影响。如果场景中没有光源，使用标准材质的物体将会呈现一片黑色。 