import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateFieldActiveToUserToken1623090906829
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_token',
      new TableColumn({
        name: 'active',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_token', 'active');
  }
}
