import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Rectangle {
    declare body: Phaser.Physics.Arcade.Body; // Garante o autocomplete da física

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 20, 20, 0x00ff00);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.body.setCollideWorldBounds(true);
    }

    public kickstart(): void {
        this.body.setGravityY(900);
        this.body.setVelocityY(-800);
    }

    public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
        if (cursors.left.isDown) {
            this.body.setVelocityX(-400);
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(400);
        } else {
            this.body.setVelocityX(0);
        } if (cursors.left.isDown) {
        this.body.setVelocityX(-250);
    } else if (cursors.right.isDown) {
        this.body.setVelocityX(250);
    } else {
        // Adiciona um pouco de "atrito" digital
        this.body.setVelocityX(this.body.velocity.x * 0.9);
    }
    }

    
 }