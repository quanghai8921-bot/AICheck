-- 1. Tắt kiểm tra Foreign Key
EXEC sp_MSforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL';


-- 2. Xóa toàn bộ dữ liệu
EXEC sp_MSforeachtable 'DELETE FROM ?';


-- 3. Bật lại kiểm tra Foreign Key
EXEC sp_MSforeachtable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL';