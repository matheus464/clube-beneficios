import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("clientes")
export class Cliente {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column({ unique: true })
    email!:string;

    @Column()
    senha!:string;

    @Column( { default : "cliente "})
    tipoUsuario!: string;

    @CreateDateColumn()
    criadoEm!: Date;
}