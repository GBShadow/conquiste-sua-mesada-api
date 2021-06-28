import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateFKToKids1624541709792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'kids',
      new TableColumn({
        name: 'todo_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'kids',
      new TableForeignKey({
        name: 'fk_todos_kids',
        columnNames: ['todo_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'todos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'kids',
      new TableColumn({
        name: 'amount_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'kids',
      new TableForeignKey({
        name: 'fk_amount_kids',
        columnNames: ['amount_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'amount',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('kids', 'fk_amount_kids');
    await queryRunner.dropColumn('kids', 'fk_todos_kids');
  }
}
