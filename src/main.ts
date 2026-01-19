 import Phaser from 'phaser';
import Player from './Player';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    backgroundColor: '#0d1117',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);
let player: Player;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let isJumping = false;
// No topo do arquivo main.ts
let platforms: Phaser.Physics.Arcade.Group;

// Dentro do create()
platforms = this.physics.add.group({
    allowGravity: false,
    immovable: true
});

for (let i = 0; i < 10; i++) {
    let x = Phaser.Math.Between(50, 350);
    let y = 450 - (i * 150);
    
    // Criamos a plataforma (um retângulo)
    const plat = platforms.create(x, y, undefined) as Phaser.GameObjects.Rectangle;
    plat.setSize(80, 20).setDisplaySize(80, 20).setFillStyle(0x238636);
    
    // Definimos uma velocidade inicial aleatória para o movimento lateral
    const speed = Phaser.Math.Between(100, 200);
    (plat.body as Phaser.Physics.Arcade.Body).setVelocityX(speed);
}
function preload(this: Phaser.Scene) {}

function create(this: Phaser.Scene) {
    player = new Player(this, 200, 540);
    
    // Criando plataformas simples para teste
    const platforms = this.physics.add.staticGroup();
    const ground = platforms.create(200, 580, undefined).setSize(400, 40).setDisplaySize(400, 40);
    const label = this.add.text(x, y, "< DATA >", { 
    fontSize: '12px', 
    fontFamily: 'monospace', 
    color: '#ffffff' 
}).setOrigin(0.5);
    this.physics.add.collider(player, platforms);

    if (this.input.keyboard) {
        cursors = this.input.keyboard.createCursorKeys();
    }

    this.input.on('pointerdown', () => {
        if (!isJumping) {
            isJumping = true;
            player.kickstart();
            this.cameras.main.startFollow(player, true, 0, 0.1);
        }
    });

    this.physics.add.collider(player, platforms, (p, plat) => {
    const body = p.body as Phaser.Physics.Arcade.Body;
    
    // Se o player estiver caindo e tocar no topo da plataforma
    if (body.touching.down) {
        body.setVelocityY(-500); // Quica automaticamente
        
        // Efeito visual opcional: trocar a cor da plataforma ao tocar
        (plat as Phaser.GameObjects.Rectangle).setFillStyle(0x00ff00);
    }
});
}

function update(this: Phaser.Scene) {
    if (isJumping && cursors) {
        player.update(cursors);

        // Se o player cair abaixo da visão da câmera (morte do pacote)
        if (player.y > this.cameras.main.scrollY + 700) {
            isJumping = false; // Permite clicar para iniciar de novo
            this.scene.restart(); // Reinicia a fase
        }
    }
}