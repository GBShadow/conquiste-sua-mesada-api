import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddKidIdToTodoAndToAmount1623259551217
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'todos',
      new TableColumn({
        name: 'kid_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'todos',
      new TableForeignKey({
        name: 'fk_kid_todos',
        columnNames: ['kid_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'kids',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'amount',
      new TableColumn({
        name: 'kid_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'amount',
      new TableForeignKey({
        name: 'fk_kid_amount',
        columnNames: ['kid_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'kids',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('amount', 'fk_kid_amount');
    await queryRunner.dropColumn('amount', 'kid_id');

    await queryRunner.dropForeignKey('todos', 'fk_kid_todos');
    await queryRunner.dropColumn('todos', 'kid_id');
  }
}
