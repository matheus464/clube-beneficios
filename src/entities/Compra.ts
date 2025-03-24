import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
import { Produto } from "./Produto";
import { Cliente } from "./Cliente";

@Entity("compras")
export class Compra {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Cliente, { eager: true})
    cliente!: Cliente;

    @ManyToMany(() => Produto, { eager: true})
    @JoinTable({
        name: "compra_produtos", // criação tabela intermedíaria
        joinColumn: { name: "compra_id"},
        inverseJoinColumn: { name: "produto_id"}
    })
    produtos!: Produto[];

    @CreateDateColumn()
    data!: Date;
}