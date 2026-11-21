-- 1. Tắt kiểm tra toàn bộ FOREIGN KEY trong database hiện tại
EXEC sp_MSforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL';


-- 2. Xóa bảng
DROP TABLE IF EXISTS table_name;


-- 3. Bật lại kiểm tra FOREIGN KEY
EXEC sp_MSforeachtable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL';