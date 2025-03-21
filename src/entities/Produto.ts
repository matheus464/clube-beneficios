import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("produtos")
export class Produto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column()
    descricao!: string;

    @Column("decimal", { precision: 10, scale: 2})
    preco!: string;

    @Column()
    categoria!: string;

    @CreateDateColumn()
    criadoEm!: Date;
}